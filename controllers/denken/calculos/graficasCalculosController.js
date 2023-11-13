import { db_denken } from "../../../config/db.js";
import { errorRes, successRes } from "../../../types/responseTypes.js";

//se utilizara then-catch por semantica practica

//balance de ingresos y egresos
export const balanceIngEgr = async(req, res) => {
  //formato fecha 0000-00-00
  const { fechaI, fechaF, unidad } = req.query;

  if(!fechaI || !fechaF) {
    res.json(errorRes('', 'El Periodo De Fechas Es Obligatorio'));
    return;
  }

  let unidadCond = unidad ? ` AND a.id_unidad_negocio = ${unidad}`: '';

  let query = `SELECT
    a.id_unidad_negocio,
    a.id_sucursal,
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
        CASE
          WHEN mb.id_ingreso_sin_factura > 0 THEN (SELECT id_sucursal FROM ingresos_sin_factura WHERE id = mb.id_ingreso_sin_factura)
          WHEN mb.id_psf > 0 THEN (SELECT id_sucursal FROM pagos_sin_factura WHERE id = mb.id_psf)
          WHEN mb.id_cxc > 0 THEN (SELECT id_sucursal FROM cxc WHERE id = mb.id_cxc)
          WHEN mb.id_gasto > 0 THEN (SELECT id_sucursal FROM gastos WHERE id = mb.id_gasto)
          WHEN mb.id_viatico > 0 THEN (SELECT id_sucursal FROM viaticos WHERE id = mb.id_viatico)
          WHEN mb.id_caja_chica > 0 THEN (SELECT id_sucursal FROM caja_chica WHERE id = mb.id_caja_chica)
          WHEN mb.id_cxp > 0 THEN (SELECT id_sucursal FROM cxp WHERE id = mb.id_cxp)
          WHEN mb.id_nomina > 0 THEN (SELECT ps.id_sucursal FROM periodos_s ps WHERE ps.id_nomina = mb.id_nomina)
          WHEN mb.id_nomina_a > 0 THEN (SELECT ps.id_sucursal FROM periodos_s_a ps WHERE ps.id_nomina_a = mb.id_nomina_a)
          ELSE (SELECT id_sucursal FROM cuentas_bancos WHERE id = mb.id_cuenta_banco)
        END AS id_sucursal,
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
    WHERE mb.tipo <> 'I' AND observaciones <> 'Seguimiento a Cobranza'
        AND IF(fecha_aplicacion='0000-00-00', (DATE(fecha) BETWEEN '${fechaI}' AND '${fechaF}'), (DATE(fecha_aplicacion) BETWEEN '${fechaI}' AND '${fechaF}'))
  ) AS a
  LEFT JOIN cat_unidades_negocio c ON c.id = a.id_unidad_negocio
  WHERE 1 
    ${unidadCond}
  ${unidad ? `GROUP BY a.id_sucursal` : 'GROUP BY a.id_unidad_negocio'};`

  try {
    const calculo = await db_denken.query(query);
    
    res.json(calculo[0]);

  } catch (error) {
    res.json(errorRes(error));
  }
}

export const ingresosCXC = async(req, res) => {
  const { fechaI, fechaF, unidad, sucursal } = req.query;

  if(!fechaF || !fechaI) {
    return res.json(errorRes('', 'Los Parametros De Fecha Son Obligatorios'));
  }

  let where = (unidad || sucursal) ? `WHERE` : '';
  let unidadesCondicion = unidad ? `tabla.id_unidad_negocio = ${unidad}`:'';
  let sucursalesCondicion = sucursal ? ` ${unidad && 'AND'} tabla.id_sucursal = ${sucursal}`:'';

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
    ${where}
      ${unidadesCondicion}
      ${sucursalesCondicion}
  GROUP BY tabla.id_unidad_negocio, tabla.id_sucursal`;
  try {
    const ingresos = await db_denken.query(query);

    res.json(ingresos[0]);
    
  } catch (error) {
    res.json(errorRes(error));
  }
}

export const egresos = async(req, res) => {
  const { fechaI, fechaF, sucursal, unidad } = req.query;

  //EVALUAR SI HAY ALGUNA CONDICION
  let where = ((fechaF || fechaI || sucursal || unidad) ? 'WHERE' : '');

  console.log(unidad ? `si esta la unidad y es ${unidad}` : 'No existe la unidada');
  let condicionUnidad = unidad 
    ? `a.id_unidad_negocio=${unidad}` 
    : '';
  
  let condicionSucursal = sucursal 
    ? `${unidad ? 'AND' : ''} a.id_sucursal=${sucursal}` 
    : '';
  
  let condicionFechaMesAnio1 =  fechaF && fechaI 
    ? `${unidad || sucursal ? 'AND' : ''} a.mes BETWEEN MONTH('${fechaI}') AND MONTH('${fechaF}') AND a.anio BETWEEN YEAR('${fechaI}') AND YEAR('${fechaF}')` 
    : '';

  let condicionFechaMesAnio2 = fechaF && fechaI 
    ? `${unidad || sucursal ? 'AND' : ''} b.mes BETWEEN MONTH('${fechaI}') AND MONTH('${fechaF}') AND b.anio BETWEEN YEAR('${fechaI}') AND YEAR('${fechaF}')` 
    : '';
    
  let condicionFecha1 = fechaF && fechaI 
    ? `${unidad || sucursal ? 'AND' : ''} a.fecha_captura BETWEEN '${fechaI}' AND '${fechaF}' ` 
    : '';

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
            ${where} 
              ${condicionUnidad}
              ${condicionSucursal} 
              ${condicionFechaMesAnio1}
            GROUP BY a.id_sucursal
            UNION ALL
            
            SELECT 
                IFNULL(b.descr,'sin_fam') AS familia,
                0 AS presupuesto,SUM(a.monto) AS ejercido,0 AS factor_prorrateo 
            FROM movimientos_presupuesto a 
            INNER JOIN sucursales b ON a.id_sucursal = b.id_sucursal AND b.activo = 1
            ${where} 
              ${condicionUnidad}
              ${condicionSucursal} 
              ${condicionFecha1}
            GROUP BY a.id_sucursal
            UNION ALL
            
            SELECT IFNULL(c.descr,'sin_fam') AS familia,0 AS presupuesto,0 AS ejercido,
            SUM((a.porcentaje_prorrateo*IFNULL(b.monto,0))/100) AS factor_prorrateo
            FROM presupuestos_prorrateados a 
            LEFT JOIN presupuesto_egresos b ON a.id_presupuesto_egreso=b.id
            INNER JOIN sucursales c ON a.id_sucursal = c.id_sucursal AND c.activo = 1
            ${where} 
              ${condicionUnidad}
              ${condicionSucursal} 
              ${condicionFechaMesAnio2}
            GROUP BY a.id_sucursal
        ) AS tabla
        
        GROUP BY tabla.familia
        ORDER BY tabla.familia ASC
    ) AS n 
  GROUP BY n.familia WITH ROLLUP`;
        
  try {
    const egreso = await db_denken.query(query);
    
    res.json(egreso[0]);

  } catch (error) {
    res.json(errorRes(error));
  }

}

export const facCanceladas = async(req, res) => {
  const { fechaI, fechaF, count } = req.query;

  if(!fechaI && !fechaF) {
    return successRes.json(errorRes('', 'Los Campos De Fecha son obligatorios'));
  }

  let query = `SELECT
    ${ count 
      ? `count(*) as canceladas` 
      : `su.descr FAMILIA,
        fa.total AS EJERCIDO,
        '' AS PRESUPUESTO,
        fac.fecha_cancelacion FECHA,
        rs.razon_social AS CLIENTE,
        fa.FOLIO`
    }
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
    
    res.json(canceladas[0]);
  } catch (error) {
    res.json(errorRes(error))
  }
}

export const familiaGastos = async(req, res) => {
  const { fechaI, fechaF, sucursal, unidad } = req.query;

  if(!fechaF || !fechaI)
    return res.json(errorRes('', 'No Contiene Los Atributos Necesarios Para La Consulta'));

  let clausulaWhere = (fechaF || fechaI || sucursal || unidad) ? 'WHERE' : '';

  let unidadCondicion = unidad ? `a.id_unidad_negocio=${unidad}`:'';

  let sucursalCondicion = sucursal 
    ?` ${unidad ? 'AND':''} a.id_sucursal = ${sucursal}`
    : '';

  let condicionFecha = fechaF || fechaI 
    ? ` ${unidad || sucursal ? 'AND':''} a.mes BETWEEN MONTH('${fechaI}') AND MONTH('${fechaF}') AND a.anio BETWEEN YEAR('${fechaI}') AND YEAR('${fechaF}')`
    : '';
                                    
  let condicionFecha2 = fechaF || fechaI 
    ? ` ${unidad || sucursal ? 'AND':''} a.fecha_captura BETWEEN '${fechaI}' AND '${fechaF}' `
    : '';

  let condicionFecha3 =  fechaF || fechaI 
    ? ` ${unidad || sucursal ? 'AND':''} b.mes BETWEEN MONTH('${fechaI}') AND MONTH('${fechaF}') AND b.anio BETWEEN YEAR('${fechaI}') AND YEAR('${fechaF}')`
    : '';  

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
        ${clausulaWhere} 
          ${unidadCondicion} 
          ${sucursalCondicion}
          ${condicionFecha} 
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
        ${clausulaWhere} 
          ${unidadCondicion}
          ${sucursalCondicion}
          ${condicionFecha2} 
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
        ${clausulaWhere} 
          ${unidadCondicion} 
          ${sucursalCondicion}
          ${condicionFecha3} 
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

export const facturasExpedidas = async(req, res) => {
  const { fechaI, fechaF, sucursal, unidad } = req.query;
  
  if(!fechaF || !fechaI) 
    return res.json(errorRes('', 'Los Parametros Requerido, Son Inexistentes'));

  //CONDICIONES DE QUERY
  let unidadCondicion = unidad ? `AND id_unidad_negocio=${unidad}`:'';
  let sucursalCondicion = sucursal ? `AND id_sucursal = ${sucursal}`:'';

  let query = `
    SELECT id, id_unidad_negocio, id_sucursal,
    COUNT( if(estatus = 'T', 1, 0) ) as expedidas
    FROM facturas
    WHERE 
      fecha >= '${fechaI}' AND fecha <= '${fechaF}'
      ${unidadCondicion}
      ${sucursalCondicion}
    GROUP BY id_unidad_negocio, id_sucursal
    ORDER BY id_unidad_negocio;`;

  try {
    const response = await db_denken.query(query);
   
    res.json(response[0]);
  } catch (error) {
    res.json(errorRes(error))
  }  
}

export const detalladoMovimientos = async(req, res) => {

  const { fechaI, fechaF, unidad, sucursal, tipo, limit, index } = req.query;
  
  if(!fechaI || !fechaF)  
    return res.json(errorRes('', 'Los Parametros Requeridos, Son Inexistentes'));

  let condUnidad = unidad ? `AND a.id_unidad_negocio = '${unidad}'` : '';
  let condSucursal = sucursal ? `AND a.id_sucursal = '${sucursal}'` : '';
  let condLimit = limit ? ` LIMIT ${limit} `: '';
  let condOffset = (index && limit) ? ` OFFSET ${index}`: '';
  
  //tipo: 1=egreso, 0=ingreso
  let tiposGastoCond = tipo ? `AND ${tipo == '1'?'NOT':''} mb.tipo IN ('A', 'I', 'T')`: '';

  let query = `SELECT 
      a.*, 
      suc.descr as sucursal_descr 
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
        CASE
          WHEN mb.id_ingreso_sin_factura > 0 THEN (SELECT id_sucursal FROM ingresos_sin_factura WHERE id = mb.id_ingreso_sin_factura)
          WHEN mb.id_psf > 0 THEN (SELECT id_sucursal FROM pagos_sin_factura WHERE id = mb.id_psf)
          WHEN mb.id_cxc > 0 THEN (SELECT id_sucursal FROM cxc WHERE id = mb.id_cxc)
          WHEN mb.id_gasto > 0 THEN (SELECT id_sucursal FROM gastos WHERE id = mb.id_gasto)
          WHEN mb.id_viatico > 0 THEN (SELECT id_sucursal FROM viaticos WHERE id = mb.id_viatico)
          WHEN mb.id_caja_chica > 0 THEN (SELECT id_sucursal FROM caja_chica WHERE id = mb.id_caja_chica)
          WHEN mb.id_cxp > 0 THEN (SELECT id_sucursal FROM cxp WHERE id = mb.id_cxp)
          WHEN mb.id_nomina > 0 THEN (SELECT ps.id_sucursal FROM periodos_s ps WHERE ps.id_nomina = mb.id_nomina)
          WHEN mb.id_nomina_a > 0 THEN (SELECT ps.id_sucursal FROM periodos_s_a ps WHERE ps.id_nomina_a = mb.id_nomina_a)
          ELSE (SELECT id_sucursal FROM cuentas_bancos WHERE id = mb.id_cuenta_banco)
        END AS id_sucursal,
        mb.id,
        mb.tipo,
		      IF(mb.tipo IN ('A', 'I', 'T'), 'Ingreso', 'Egreso') AS tipo_movimiento,
        mb.monto,
        mb.fecha_aplicacion as fecha,
        cb.cuenta,
        banco.descripcion as banco,
        cb.descripcion as descripcion_cuenta,
          IF(mb.observaciones <> '', mb.observaciones, 'SIN DESCRIPCION') as observaciones,
        mb.fondeo
      FROM movimientos_bancos mb
      LEFT JOIN cuentas_bancos cb on mb.id_cuenta_banco = cb.id
      LEFT JOIN bancos banco on cb.id_banco = banco.id
      WHERE mb.tipo <> 'I' AND observaciones <> 'Seguimiento a Cobranza'
        ${tiposGastoCond}
        AND IF(fecha_aplicacion='0000-00-00', (DATE(fecha) BETWEEN '${fechaI}' AND '${fechaF}'), (DATE(fecha_aplicacion) BETWEEN '${fechaI}' AND '${fechaF}'))
      ) AS a
  LEFT JOIN sucursales suc on a.id_sucursal = suc.id_sucursal
  WHERE 
  1 
  ${condUnidad}
  ${condSucursal}
  ORDER BY a.id desc
  ${condLimit}
  ${condOffset}`;

  try {
    const response = await db_denken.query(query);
    res.json(response[0]);

  } catch (error) {
    res.json(errorRes(error));
  }
}

//Sumatoria de los ingresos por CXC filtrados
export const presupuestoIngresos = async(req, res) => {
  const {fechaI, fechaF, unidad, sucursal} = req.query;

  if(!fechaI || !fechaF)
    return res.json(errorRes('', 'Los Parametros Requeridos, Son Inexistentes'));

  let condicionUnidad = unidad ? `AND cxc.id_unidad_negocio = ${unidad}`: '';
  let condicionSucursal = sucursal ? `AND cxc.id_unidad_negocio = ${sucursal}`: '';

  const query = `SELECT
      cxc.id_unidad_negocio as id_unidad,
        unit.descripcion as unidad,
        cxc.id_sucursal,
        suc.descr as sucursal,
      SUM(cxc.total) as total_presupuesto
    FROM cxc cxc
    LEFT JOIN sucursales suc on suc.id_sucursal = cxc.id_sucursal
    LEFT JOIN cat_unidades_negocio unit on unit.id = cxc.id_unidad_negocio
    where 
      1
      AND cxc.vencimiento > '${fechaI}' 
        AND cxc.vencimiento < '${fechaF} 
        AND cxc.vencimiento <> '0000-00-00' -- las facturas asi son pagadas
        ${condicionUnidad}
        ${condicionSucursal}
    ${unidad ? 'GROUP BY cxc.id_sucursal, cxc.id_unidad_negocio' : ''}
    ORDER BY cxc.id_unidad_negocio, cxc.id_sucursal desc`;

    try {
      const response = await db_denken.query(query);
      res.json(response[0]);
    } catch (error) {
      res.json(errorRes(error));
    }
}





