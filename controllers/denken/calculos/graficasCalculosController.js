import { db_denken } from "../../../config/db.js";
import { errorRes, successRes } from "../../../types/responseTypes.js";

//se utilizara then-catch por semantica practica

//balance de ingresos y egresos
export const balanceIngEgr = async(req, res) => {
  //formato fecha 0000-00-00
  const { fechaI, fechaF } = req.query;

  if(!fechaI || !fechaF) {
    res.json(errorRes('', 'El Periodo De Fechas Es Obligatorio'));
    return;
  }

  let query = `SELECT
    a.id_unidad_negocio,
    IF(a.id_unidad_negocio = 0, 'SIN UNIDAD', c.nombre) AS FAMILIA,
    SUM(IF(a.tipo = 'I' OR (a.tipo = 'A' AND a.fondeo = 0),a.monto,0)) as EJERCIDO,
    SUM(IF(a.tipo = 'C',a.monto,0)) as PRESUPUESTO,
    SUM(IF(a.tipo = 'I' OR (a.tipo = 'A' AND a.fondeo = 0),a.monto,0)) - SUM(IF(a.tipo = 'C' OR (a.tipo = 'T' AND a.transferencia = 0),a.monto,0)) AS SALDO,
    SUM(IF(a.fondeo = 1 AND a.transferencia <> 0, /* AQUI IF TRUE*/IF(a.id_unidad_negocio2 = (SELECT (SELECT id_unidad_negocio FROM cuentas_bancos WHERE id = mb.id_cuenta_banco) id_unidad_negocio2 FROM movimientos_bancos mb WHERE id = a.transferencia), 0, a.monto),/* AQUI IF FALSE*/0)) AS FONDEO
  FROM (
    SELECT 
        CASE
            WHEN mb.id_ingreso_sin_factura > 0 THEN (SELECT id_unidad_negocio FROM ingresos_sin_factura WHERE id = mb.id_ingreso_sin_factura)
            WHEN mb.id_psf > 0 THEN (SELECT id_unidad_negocio FROM pagos_sin_factura WHERE id = mb.id_psf)
            WHEN mb.id_cxc > 0 THEN (SELECT id_unidad_negocio FROM cxc WHERE id = mb.id_cxc)
            WHEN mb.id_gasto > 0 THEN (SELECT id_unidad_negocio FROM gastos WHERE id = mb.id_gasto)
            WHEN mb.id_viatico > 0 THEN (SELECT id_unidad_negocio FROM viaticos WHERE id = mb.id_viatico)
            WHEN mb.id_caja_chica > 0 THEN (SELECT id_unidad_negocio FROM caja_chica WHERE id = mb.id_caja_chica)
            WHEN mb.id_cxp > 0 THEN (SELECT id_unidad_negocio FROM cxp WHERE id = mb.id_cxp)
            WHEN mb.id_nomina > 0 THEN (SELECT su.id_unidad_negocio FROM periodos_s ps INNER JOIN sucursales su ON ps.id_sucursal = su.id_sucursal WHERE ps.id_nomina = mb.id_nomina)
            WHEN mb.id_nomina_a > 0 THEN (SELECT su.id_unidad_negocio FROM periodos_s_a ps INNER JOIN sucursales su ON ps.id_sucursal = su.id_sucursal WHERE ps.id_nomina_a = mb.id_nomina_a)
            ELSE (SELECT id_unidad_negocio FROM cuentas_bancos WHERE id = mb.id_cuenta_banco)
        END AS id_unidad_negocio,
        (SELECT id_unidad_negocio FROM cuentas_bancos WHERE id = mb.id_cuenta_banco) id_unidad_negocio2,
        tipo,
        transferencia,
        monto,
        fecha_aplicacion,
        fecha,
        id_cuenta_banco,
        id,
        fondeo
    FROM movimientos_bancos mb
    WHERE mb.tipo <> 'I'
        AND IF(fecha_aplicacion='0000-00-00', (DATE(fecha) BETWEEN '${fechaI}' AND '${fechaF}'), (DATE(fecha_aplicacion) BETWEEN '${fechaI}' AND '${fechaF}'))
  ) AS a
  LEFT JOIN cat_unidades_negocio c ON c.id = a.id_unidad_negocio
  GROUP BY a.id_unidad_negocio;`

  try {
    const calculo = await db_denken.query(query);
    
    res.json(calculo);

  } catch (error) {
    res.json(errorRes(error));
  }
}

export const ingresosCXC = async(req, res) => {
  const { fechaI, fechaF } = req.query;

  if(!fechaF || !fechaI) {
    return res.json(errorRes('', 'Los Parametros De Fecha Son Obligatorios'));
  }

  let query = `SELECT
    tabla.nombre,
    tabla.id_unidad_negocio,
    CONCAT(tabla.nombre,' - ',tabla.FAMILIA) as FAMILIA,
    SUM(tabla.EJERCIDO) EJERCIDO,
    SUM(tabla.presupuesto) PRESUPUESTO
  FROM (
    SELECT cun.nombre, fa.id_unidad_negocio, su.descr AS FAMILIA, SUM(IF(fa.estatus <> 'C', fa.total,0)) EJERCIDO, SUM(IF(fa.estatus = 'C', '', 0)) AS PRESUPUESTO, fa.id_sucursal
    FROM cxc fa
    INNER JOIN cat_unidades_negocio cun ON cun.id = fa.id_unidad_negocio
    INNER JOIN sucursales su ON fa.id_sucursal = su.id_sucursal
    WHERE DATE(fa.fecha) BETWEEN '${fechaI}' AND '${fechaF}'
        -- AND fa.id NOT IN (SELECT id_cxc FROM pagos_sin_factura_bitacora)
        -- AND fa.folio_cxc <> 0
        AND fa.id_pago <> 0
    GROUP BY fa.id_unidad_negocio, fa.id_sucursal

    UNION ALL

    SELECT IFNULL(cun.nombre,'SIN UNIDAD') nombre, psf.id_unidad_negocio, IFNULL(su.descr, 'SIN SUCURSAL') AS FAMILIA, SUM(psf.monto) EJERCIDO, 0 PRESUPUESTO, psf.id_sucursal
    FROM pagos_sin_factura psf
    LEFT JOIN cat_unidades_negocio cun ON cun.id = psf.id_unidad_negocio
    LEFT JOIN sucursales su ON psf.id_sucursal = su.id_sucursal
    WHERE DATE(psf.fecha) BETWEEN '${fechaI}' AND '${fechaF}' AND psf.monto <> 0
    GROUP BY psf.id_unidad_negocio, psf.id_sucursal
  ) as tabla
  GROUP BY tabla.id_unidad_negocio, tabla.id_sucursal`;
  try {
    const ingresos = await db_denken.query(query);

    res.json(ingresos);
    
  } catch (error) {
    res.json(errorRes(error));
  }
}

export const egresosUnidad = async(req, res) => {
  const { fechaI, fechaF } = req.query;
  const { unidad } = req.params;

  let condicionFechaMesAnio1 =  `AND a.mes BETWEEN MONTH('${fechaI}') AND MONTH('${fechaF}')
  AND a.anio BETWEEN YEAR('${fechaI}') AND YEAR('${fechaF}')`;

  let condicionFechaMesAnio2 =  `AND b.mes BETWEEN MONTH('${fechaI}') AND MONTH('${fechaF}')
    AND b.anio BETWEEN YEAR('${fechaI}') AND YEAR('${fechaF}')`;

  let condicionFecha1 = ` AND a.fecha_captura BETWEEN '${fechaI}' AND '${fechaF}' `;

  let query = `SELECT 
    IF(IFNULL(n.familia,'')='','TOTAL',IF(n.familia='sin_fam','',n.familia)) AS FAMILIA,
    SUM(n.presupuesto) AS PRESUPUESTO,
    SUM(n.ejercido) AS EJERCIDO,
    CONCAT(FORMAT(SUM(n.porcentaje),2),'%') AS PORCENTAJE
    FROM (
        SELECT tabla.familia AS familia, 
        IFNULL(SUM(tabla.presupuesto)+SUM(tabla.factor_prorrateo),0) AS presupuesto, 
        IFNULL(SUM(tabla.ejercido),0) AS ejercido, 
        IF((SUM(tabla.presupuesto)+SUM(tabla.factor_prorrateo)) > 0,IFNULL((SUM(tabla.ejercido) * 100)/(SUM(tabla.presupuesto)+SUM(tabla.factor_prorrateo)),0),0) AS porcentaje 
        FROM (	
            SELECT 
                IFNULL(b.descr,'sin_fam') AS familia,
                SUM(a.monto) AS presupuesto,
                0 AS ejercido,0 AS factor_prorrateo
            FROM presupuesto_egresos a 
            INNER JOIN sucursales b ON a.id_sucursal = b.id_sucursal AND b.activo = 1
            WHERE a.id_unidad_negocio=${unidad} ${condicionFechaMesAnio1}
            GROUP BY a.id_sucursal
            UNION ALL
            
            SELECT 
                IFNULL(b.descr,'sin_fam') AS familia,
                0 AS presupuesto,SUM(a.monto) AS ejercido,0 AS factor_prorrateo 
            FROM movimientos_presupuesto a 
            INNER JOIN sucursales b ON a.id_sucursal = b.id_sucursal AND b.activo = 1
            WHERE a.id_unidad_negocio=${unidad} ${condicionFecha1}
            GROUP BY a.id_sucursal
            UNION ALL
            
            SELECT IFNULL(c.descr,'sin_fam') AS familia,0 AS presupuesto,0 AS ejercido,
            SUM((a.porcentaje_prorrateo*IFNULL(b.monto,0))/100) AS factor_prorrateo
            FROM presupuestos_prorrateados a 
            LEFT JOIN presupuesto_egresos b ON a.id_presupuesto_egreso=b.id
            INNER JOIN sucursales c ON a.id_sucursal = c.id_sucursal AND c.activo = 1
            WHERE a.id_unidad_negocio=${unidad} ${condicionFechaMesAnio2}
            GROUP BY a.id_sucursal
        ) AS tabla
        
        GROUP BY tabla.familia
        ORDER BY tabla.familia ASC
    ) AS n 
  GROUP BY n.familia WITH ROLLUP`;
        
  try {
    const egreso = await db_denken.query(query);
    
    res.json(egreso);

  } catch (error) {
    res.json(errorRes(error));
  }

}

export const facCanceladas = async(req, res) => {
  const { fechaI, fechaF } = req.query;

  if(!fechaI && !fechaF) {
    return successRes.json(errorRes('', 'Los Campos De Fecha son obligatorios'));
  }

  let query = `SELECT
    su.descr FAMILIA,
    fa.total AS EJERCIDO,
    '' AS PRESUPUESTO,
    fac.fecha_cancelacion FECHA,
    rs.razon_social AS CLIENTE,
    fa.FOLIO
  FROM facturas fa
  INNER JOIN cat_unidades_negocio cun ON cun.id = fa.id_unidad_negocio
  INNER JOIN sucursales su ON fa.id_sucursal = su.id_sucursal
  INNER JOIN facturas_cfdi fac ON fa.id = fac.id_factura
  INNER JOIN razones_sociales rs ON rs.id = fa.id_razon_social
  WHERE fa.estatus = 'C'
    AND DATE(fac.fecha_cancelacion) >= '${fechaI}'
    AND DATE(fac.fecha_cancelacion) <= '${fechaF}'
    AND fa.id_unidad_negocio = 1;`;
  try {
    const canceladas = await db_denken.query(query);
    
    res.json(canceladas);
  } catch (error) {
    res.json(errorRes(error))
  }
}

//pendiente
export const facturacion = async(req, res) => {
  
}

export const familiaGastos = async(req, res) => {
  const { fechaI, fechaF } = req.query;
  const { unidad } = req.params;

  if(!fechaF || !fechaI)
    return res.json(errorRes('', 'No Contiene Los Atributos Necesarios Para La Consulta'));

  let condicionFecha =  `AND a.mes BETWEEN MONTH('${fechaI}') AND MONTH('${fechaF}')
                                    AND a.anio BETWEEN YEAR('${fechaI}') AND YEAR('${fechaF}')`;
                                    
  let condicionFecha2 = ` AND a.fecha_captura BETWEEN '${fechaI}' AND '${fechaF}' `;

  let condicionFecha3 =  `AND b.mes BETWEEN MONTH('${fechaI}') AND MONTH('${fechaF}')
                                  AND b.anio BETWEEN YEAR('${fechaI}') AND YEAR('${fechaF}')`;
  let query = `SELECT 
  IF(IFNULL(n.familia,'')='','TOTAL',IF(n.familia='sin_fam','',n.familia)) AS FAMILIA,
  SUM(n.presupuesto) AS PRESUPUESTO,
  SUM(n.ejercido) AS EJERCIDO,
  CONCAT(FORMAT(SUM(n.porcentaje),2),'%') AS PORCENTAJE,
  n.id_fam
FROM (
  SELECT tabla.familia AS familia, 
  IFNULL(SUM(tabla.presupuesto)+SUM(tabla.factor_prorrateo),0) AS presupuesto, 
  IFNULL(SUM(tabla.ejercido),0) AS ejercido, 
  IF((SUM(tabla.presupuesto)+SUM(tabla.factor_prorrateo)) > 0,IFNULL((SUM(tabla.ejercido) * 100)/(SUM(tabla.presupuesto)+SUM(tabla.factor_prorrateo)),0),0) AS porcentaje,
  tabla.id_fam
  FROM (	
      SELECT 
          IFNULL(b.descr,'sin_fam') AS familia,
          SUM(a.monto) AS presupuesto,
          0 AS ejercido,
          0 AS factor_prorrateo,
          b.id_fam AS id_fam
      FROM presupuesto_egresos a 
      LEFT JOIN fam_gastos b ON a.id_familia_gasto = b.id_fam
      WHERE a.id_unidad_negocio=${unidad} ${condicionFecha}
      GROUP BY a.id_familia_gasto

      UNION ALL
      
      SELECT 
          IFNULL(b.descr,'sin_fam') AS familia,
          0 AS presupuesto,
          SUM(a.monto) AS ejercido,
          0 AS factor_prorrateo,
          b.id_fam AS id_fam
      FROM movimientos_presupuesto a 
      LEFT JOIN fam_gastos b ON a.id_familia_gasto = b.id_fam
      WHERE a.id_unidad_negocio=${unidad} ${condicionFecha2}
      GROUP BY a.id_familia_gasto
      UNION ALL
      
      SELECT
          IFNULL(c.descr,'sin_fam') AS familia,
          0 AS presupuesto,
          0 AS ejercido,
          SUM((a.porcentaje_prorrateo*IFNULL(b.monto,0))/100) AS factor_prorrateo,
          c.id_fam AS id_fam
      FROM presupuestos_prorrateados a 
      LEFT JOIN presupuesto_egresos b ON a.id_presupuesto_egreso=b.id
      LEFT JOIN fam_gastos c ON a.id_familia_gasto = c.id_fam
      WHERE a.id_unidad_negocio=${unidad} ${condicionFecha3}
      GROUP BY a.id_familia_gasto
  ) AS tabla
  
  GROUP BY tabla.familia
  ORDER BY tabla.familia ASC
) AS n 
GROUP BY n.familia WITH ROLLUP`;

  try {
    const gastos = await db_denken.query(query);
    
    res.json(gastos[0]);
  } catch (error) {
    res.json(errorRes(error));
  }
}


