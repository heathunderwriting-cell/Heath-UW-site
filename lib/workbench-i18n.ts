import type { Locale } from "@/lib/i18n";

const EN_TOKEN_REPLACEMENTS: Array<[string, string]> = [
  ["Buscar por asegurado, broker o ID", "Search by insured, broker, or ID"],
  ["Filtro Línea", "Line filter"],
  ["Filtro Estado", "Status filter"],
  ["Filtro Prioridad", "Priority filter"],
  ["Filtro Broker", "Broker filter"],
  ["Filtro Asignado", "Assignee filter"],
  ["Reset Línea", "Reset line"],
  ["Reset Estado", "Reset status"],
  ["Reset Prioridad", "Reset priority"],
  ["Reset Broker", "Reset broker"],
  ["Reset Asignado", "Reset assignee"],
  ["Actualizando...", "Refreshing..."],
  ["Actualizar", "Refresh"],
  ["Sin resultados", "No results"],
  ["Probá cambiar filtros o buscar por broker/insured.", "Try changing filters or searching by broker/insured."],
  ["No hay submissions", "No submissions"],
  ["Actualizá la bandeja o ajustá los filtros.", "Refresh the inbox or adjust filters."],
  ["INBOX", "INBOX"],
  ["Decisiones", "Decisions"],
  ["Acciones sobre este riesgo", "Actions on this risk"],
  ["Status del proceso", "Process status"],
  ["Trazabilidad del caso", "Case traceability"],
  ["Notas internas", "Internal notes"],
  ["Notas del equipo", "Team notes"],
  ["Comentarios internos", "Internal comments"],
  ["Escribí una nota accionable: qué falta, qué validaste y la acción siguiente.", "Write an actionable note: what is missing, what you validated, and the next action."],
  ["Este caso no tiene notas internas aún.", "This case has no internal notes yet."],
  ["Próximos pasos", "Next steps"],
  ["Próximos movimientos", "Upcoming actions"],
  ["Disponible para revisión", "Available for review"],
  ["SLA vence en", "SLA due in"],
  ["Detalle", "Detail"],
  ["Recibido", "Received"],
  ["Completado", "Completed"],
  ["Procesado", "Processed"],
  ["En curso", "In progress"],
  ["Cierre", "Close"],
  ["Lectura ejecutiva", "Executive readout"],
  ["Resumen automático", "Automatic summary"],
  ["Usalo como primer filtro: confirmá con documentos antes de emitir.", "Use this as a first filter: confirm with documents before issuing."],
  ["Validar limites y consistencia documental.", "Validate limits and documentation consistency."],
  ["Validar límites y consistencia documental.", "Validate limits and documentation consistency."],
  ["Solicitar info", "Request info"],
  ["Asignar / Reasignar", "Assign / Reassign"],
  ["Participation sugerida", "Suggested participation"],
  ["Revisión adicional por estrategia operativa", "Additional review due to operating strategy"],
  ["Listo para decision", "Ready for decision"],
  ["En evaluacion tecnica", "In technical evaluation"],
  ["SLA en riesgo", "SLA at risk"],
  ["sin accion", "without action"],
  ["sin acción", "without action"],
  ["sin asignacion", "without assignment"],
  ["sin asignación", "without assignment"],
  ["Rechazar", "Reject"],
  ["Participar", "Participate"],
  ["Riesgo Medium", "Risk: Medium"],
  ["Riesgo High", "Risk: High"],
  ["Riesgo Low", "Risk: Low"],
  ["Risk Medium", "Risk: Medium"],
  ["Risk High", "Risk: High"],
  ["Risk Low", "Risk: Low"],
  ["Close caso", "Close case"],
  ["Out of appetite/estrategia. Close caso.", "Out of appetite/strategy. Close case."],
  ["casos activos", "active cases"],
  ["Sin asignar", "Unassigned"],
  ["Listo para decisión", "Ready for decision"],
  ["En riesgo SLA", "SLA at risk"],
  ["Problema del caso", "Case issue"],
  ["Evidencia suficiente para tomar decision.", "Sufficient evidence to make a decision."],
  ["Evidencia suficiente para tomar decisión.", "Sufficient evidence to make a decision."],
  ["No alineado con apetito", "Out of appetite"],
  ["Apetito:", "Appetite:"],
  ["Caso activo", "Active case"],
  ["Prima", "Premium"],
  ["Efectiva", "Effective"],
  ["Recomendación del sistema", "System recommendation"],
  ["Nivel de riesgo", "Risk level"],
  ["Confianza del modelo", "Model confidence"],
  ["Re-sincronizar", "Re-sync"],
  ["Estado operativo", "Operational status"],
  ["SLA restante", "SLA remaining"],
  ["Flujo de trabajo", "Workflow"],
  ["Comprensión", "Understanding"],
  ["Evaluación", "Evaluation"],
  ["Resumen estructurado", "Structured summary"],
  ["Insights clave", "Key insights"],
  ["Para decidir", "For decision"],
  ["IA accionable", "Actionable AI"],
  ["Emitir", "Issue"],
  ["Sin emisión", "No issuance"],
  ["Riesgo Alto", "High risk"],
  ["Riesgo Medio", "Medium risk"],
  ["Riesgo Bajo", "Low risk"],
  ["Bajo", "Low"],
  ["Medio", "Medium"],
  ["Alto", "High"],
  ["Capacidad", "Capacity"],
  ["Uso", "Usage"],
  ["Participación", "Participation"],
  ["Lead", "Lead"],
  ["Fechas", "Dates"],
  ["Deducible", "Deductible"],
  ["Límite", "Limit"],
  ["Región", "Region"],
  ["Asegurado", "Insured"],
  ["Broker", "Broker"],
  ["Riesgo", "Risk"],
  ["Asignado", "Assigned"],
  ["Sistema:", "System:"],
  ["Revisión requerida", "Review required"],
  ["Solicitar datos", "Request data"],
  ["Cotizar", "Quote"],
  ["Cerrar", "Close"],
  ["Cancelar", "Cancel"],
  ["Confirmar", "Confirm"],
  ["Solicitar más información", "Request more information"],
  ["Aprobar para cotizar", "Approve for quote"],
  ["Declinar", "Decline"],
  ["Pendiente información", "Pending information"],
  ["En revisión", "In review"],
  ["Recomendado", "Recommended"],
  ["Declinado", "Declined"],
  ["Cotizado", "Quoted"],
  ["Nuevo", "New"],
  ["Todas", "All"],
  ["Todos", "All"],
  ["Alta", "High"],
  ["Media", "Medium"],
  ["Baja", "Low"],
  ["En apetito", "In appetite"],
  ["Fuera de apetito", "Out of appetite"],
  ["Revisar", "Review"],
  ["Reasignado desde", "Reassigned from"],
  ["Bandeja actualizada", "Inbox updated"],
  ["Nota agregada", "Note added"],
  ["Acción registrada", "Action recorded"],
  ["Decisión emitida", "Decision issued"],
  ["Solicitud de información", "Information request"],
  ["Comentario agregado", "Comment added"],
  ["Archivos procesados", "Files processed"],
  ["Asignado a underwriter", "Assigned to underwriter"],
  ["Submission recibido", "Submission received"],
  ["Cargando panel...", "Loading dashboard..."],
  ["Cerrar sesión", "Sign out"],
  ["Capacidad", "Capacity"],
  ["Riesgo", "Risk"],
  ["Estado", "Status"],
  ["Prioridad", "Priority"],
  ["Documentos", "Documents"],
  ["Actividad", "Activity"],
  ["Resumen", "Summary"],
  ["Decisión", "Decision"],
  ["Justo ahora", "Just now"],
  ["Participación sugerida", "Suggested participation"],
  ["pedir info", "request info"],
];

const ZH_TOKEN_REPLACEMENTS: Array<[string, string]> = [
  ["Buscar por asegurado, broker o ID", "按被保险人、经纪人或 ID 搜索"],
  ["Filtro Línea", "业务线筛选"],
  ["Filtro Estado", "状态筛选"],
  ["Filtro Prioridad", "优先级筛选"],
  ["Filtro Broker", "经纪人筛选"],
  ["Filtro Asignado", "负责人筛选"],
  ["Reset Línea", "重置业务线"],
  ["Reset Estado", "重置状态"],
  ["Reset Prioridad", "重置优先级"],
  ["Reset Broker", "重置经纪人"],
  ["Reset Asignado", "重置负责人"],
  ["Actualizando...", "更新中..."],
  ["Actualizar", "刷新"],
  ["Sin resultados", "无结果"],
  ["No hay submissions", "暂无提交"],
  ["INBOX", "收件箱"],
  ["Decisiones", "决策"],
  ["Acciones sobre este riesgo", "针对该风险的操作"],
  ["Status del proceso", "流程状态"],
  ["Trazabilidad del caso", "案件追踪"],
  ["Notas internas", "内部备注"],
  ["Próximos pasos", "下一步"],
  ["Disponible para revisión", "可进入复核"],
  ["SLA vence en", "SLA 到期于"],
  ["Detalle", "详情"],
  ["Recibido", "已接收"],
  ["Completado", "已完成"],
  ["Procesado", "已处理"],
  ["En curso", "进行中"],
  ["Cierre", "关闭"],
  ["Resumen automático", "自动摘要"],
  ["Solicitar info", "请求信息"],
  ["Asignar / Reasignar", "分配 / 重新分配"],
  ["Listo para decision", "可进入决策"],
  ["Listo para decisión", "可进入决策"],
  ["En evaluacion tecnica", "技术评估中"],
  ["En evaluación técnica", "技术评估中"],
  ["SLA en riesgo", "SLA 有风险"],
  ["Sin asignar", "未分配"],
  ["Rechazar", "拒绝"],
  ["Participar", "参与"],
  ["Close caso", "关闭案件"],
  ["casos activos", "活跃案件"],
  ["Apetito:", "承保偏好："],
  ["Caso activo", "活跃案件"],
  ["Prima", "保费"],
  ["Efectiva", "生效日"],
  ["Recomendación del sistema", "系统建议"],
  ["Nivel de riesgo", "风险等级"],
  ["Confianza del modelo", "模型置信度"],
  ["Estado operativo", "运营状态"],
  ["SLA restante", "剩余 SLA"],
  ["Flujo de trabajo", "工作流"],
  ["Resumen estructurado", "结构化摘要"],
  ["Insights clave", "关键洞察"],
  ["Para decidir", "决策参考"],
  ["Emitir", "出单"],
  ["Sin emisión", "不出单"],
  ["Riesgo Alto", "高风险"],
  ["Riesgo Medio", "中风险"],
  ["Riesgo Bajo", "低风险"],
  ["Capacidad", "承保能力"],
  ["Uso", "使用率"],
  ["Participación", "参与比例"],
  ["Fechas", "日期"],
  ["Deducible", "免赔额"],
  ["Límite", "限额"],
  ["Región", "地区"],
  ["Asegurado", "被保险人"],
  ["Riesgo", "风险"],
  ["Asignado", "已分配"],
  ["Revisión requerida", "需要复核"],
  ["Solicitar datos", "请求数据"],
  ["Cotizar", "报价"],
  ["Cerrar", "关闭"],
  ["Cancelar", "取消"],
  ["Confirmar", "确认"],
  ["Solicitar más información", "请求更多信息"],
  ["Aprobar para cotizar", "批准报价"],
  ["Declinar", "拒保"],
  ["Pendiente información", "待补充信息"],
  ["En revisión", "审核中"],
  ["Recomendado", "推荐"],
  ["Declinado", "已拒保"],
  ["Cotizado", "已报价"],
  ["Nuevo", "新建"],
  ["Todas", "全部"],
  ["Todos", "全部"],
  ["Alta", "高"],
  ["Media", "中"],
  ["Baja", "低"],
  ["En apetito", "符合承保偏好"],
  ["Fuera de apetito", "超出承保偏好"],
  ["Revisar", "复核"],
  ["Bandeja actualizada", "收件箱已更新"],
  ["Nota agregada", "备注已添加"],
  ["Acción registrada", "操作已记录"],
  ["Decisión emitida", "决策已发出"],
  ["Solicitud de información", "信息请求"],
  ["Comentario agregado", "评论已添加"],
  ["Archivos procesados", "文件已处理"],
  ["Submission recibido", "已收到提交"],
  ["Cargando panel...", "正在加载仪表盘..."],
  ["Cerrar sesión", "退出登录"],
  ["Estado", "状态"],
  ["Prioridad", "优先级"],
  ["Documentos", "文档"],
  ["Actividad", "活动"],
  ["Resumen", "摘要"],
  ["Decisión", "决策"],
  ["Justo ahora", "刚刚"],
  ["Participación sugerida", "建议参与比例"],
  ["Sistema:", "系统："],
  ["Comprensión", "理解"],
  ["Evaluación", "评估"],
  ["Notas del equipo", "团队备注"],
  ["pedir info", "请求信息"],
];

function reversePairs(pairs: ReadonlyArray<readonly [string, string]>) {
  return pairs.map(([from, to]) => [to, from] as [string, string]);
}

// Sort longest-source-first so compound phrases are replaced before their
// shorter substrings (this is what prevents the mixed-language leaks like
// "可进入Decisions").
function bySourceLenDesc(pairs: ReadonlyArray<readonly [string, string]>) {
  return [...pairs].sort((a, b) => b[0].length - a[0].length);
}

const ES_TO_EN = bySourceLenDesc(EN_TOKEN_REPLACEMENTS);
const ES_TO_ZH = bySourceLenDesc(ZH_TOKEN_REPLACEMENTS);
const EN_TO_ES = bySourceLenDesc(reversePairs(EN_TOKEN_REPLACEMENTS));
const ZH_TO_ES = bySourceLenDesc(reversePairs(ZH_TOKEN_REPLACEMENTS));

function applyPairs(text: string, pairs: ReadonlyArray<readonly [string, string]>) {
  let out = text;
  for (const [from, to] of pairs) {
    if (from && from !== to) out = out.split(from).join(to);
  }
  return out;
}

function timeToEs(text: string) {
  return text
    .replace(/(\d+)\s*天前/g, "Hace $1d")
    .replace(/(\d+)\s*小时前/g, "Hace $1h")
    .replace(/(\d+)\s*分钟前/g, "Hace $1m")
    .replace(/(\d+)\s*d\s*ago/gi, "Hace $1d")
    .replace(/(\d+)\s*h\s*ago/gi, "Hace $1h")
    .replace(/(\d+)\s*m\s*ago/gi, "Hace $1m");
}

function timeFromEs(text: string, locale: Locale) {
  if (locale === "en") {
    return text
      .replace(/Hace\s*(\d+)\s*d/gi, "$1d ago")
      .replace(/Hace\s*(\d+)\s*h/gi, "$1h ago")
      .replace(/Hace\s*(\d+)\s*m/gi, "$1m ago");
  }
  if (locale === "zh") {
    return text
      .replace(/Hace\s*(\d+)\s*d/gi, "$1天前")
      .replace(/Hace\s*(\d+)\s*h/gi, "$1小时前")
      .replace(/Hace\s*(\d+)\s*m/gi, "$1分钟前");
  }
  return text;
}

function translateWorkbenchText(text: string, locale: Locale) {
  // 1) Normalize whatever is currently rendered back to the Spanish canonical.
  //    Only normalize FROM the other languages (never from the target language
  //    itself) so we don't corrupt real data such as broker/insured names.
  let es = text;
  if (locale === "en") es = applyPairs(es, ZH_TO_ES);
  else if (locale === "zh") es = applyPairs(es, EN_TO_ES);
  else es = applyPairs(applyPairs(es, EN_TO_ES), ZH_TO_ES);
  es = timeToEs(es);

  // 2) Map the Spanish canonical to the target language.
  if (locale === "es") return es;
  const out = applyPairs(es, locale === "en" ? ES_TO_EN : ES_TO_ZH);
  return timeFromEs(out, locale);
}

export function translateWorkbenchDom(root: HTMLElement, locale: Locale) {
  const translatableAttrs = ["placeholder", "aria-label", "title"] as const;
  const elements = root.querySelectorAll<HTMLElement>("*");
  for (const el of elements) {
    for (const attr of translatableAttrs) {
      const current = el.getAttribute(attr);
      if (!current) continue;
      const translated = translateWorkbenchText(current, locale);
      if (translated !== current) {
        el.setAttribute(attr, translated);
      }
    }
  }

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode();
  while (node) {
    const textNode = node as Text;
    const current = textNode.nodeValue ?? "";
    const translated = translateWorkbenchText(current, locale);
    if (translated !== current) {
      textNode.nodeValue = translated;
    }
    node = walker.nextNode();
  }
}
