import { db_denken } from "../../../config/db.js";
import { authErrorRes, errorRes, successRes } from "../../../types/responseTypes.js";
import { autenticar } from "../../../helpers/autenticacion.js";

//se utilizara then-catch por semantica practica

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