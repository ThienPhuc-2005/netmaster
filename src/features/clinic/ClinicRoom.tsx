// Khung bệnh nhân của Phòng khám (spec Module 11) — vỏ UI cho câu hỏi
// `kind: 'clinic'`, nối ba mảnh: terminal ảo (khám), danh sách chẩn đoán
// (gọi tên bệnh), và pha sửa (sơ đồ thật qua NetworkLab, hoặc chọn hành
// động với ca ngoài mô hình mạng).
//
// Trình tự là một phần của bài học, không phải trang trí:
//   1. KHÁM MÙ — chỉ có lời than + terminal. Không sơ đồ: ngoài đời không
//      ai được nhìn sơ đồ chuẩn của mạng đang hỏng, và lộ sơ đồ sớm là
//      ca "rút dây" tự giải bằng mắt, terminal thành đồ cảnh.
//   2. CHỐT CHẨN ĐOÁN — chọn bệnh xong pha sửa mới mở. Sau đó vẫn đổi
//      được chẩn đoán (chip chọn lại) mà không mất công sửa dở.
//   3. SỬA — ca sửa-mạng mở đúng phòng lab quen (ẩn "Chỗ đáng nhìn lại"
//      vì tìm bệnh là việc của người học); ca ngoài mô hình chọn hành
//      động. "Chạy lại triệu chứng" miễn phí như "Gửi thử".
//
// Component chỉ THU THẬP câu trả lời hai phần rồi trao lên qua onSubmit —
// việc chấm và đếm lượt thuộc tầng gọi, y hệt NetworkLab/PalaceWalk.

import { useCallback, useMemo, useState } from 'react'
import { lt, maybeLt } from '../../engine/ltext'
import { HeartPulse, Stethoscope } from 'lucide-react'
import { useT } from '../../i18n'
import { Button } from '../../components/Button'
import type { ClinicQuestion, LText } from '../../engine/contentSchema'
import type { QuestionResponse } from '../../engine/grading/gradeQuestion'
import { checkSymptom, phanMang, type ClinicPatient } from '../../engine/clinic'
import { findDevice, type LabSpec, type Topology } from '../../engine/lab'
import { NetworkLab } from '../lab/NetworkLab'
import { ClinicTerminal } from './ClinicTerminal'
import { ClinicDeviceConsole } from './ClinicDeviceConsole'

export interface ClinicRoomProps {
  question: ClinicQuestion
  /**
   * Nộp một lượt trả lời trọn gói (chẩn đoán + cách sửa). Không truyền
   * thì phòng khám ở chế độ xem — không có nút nộp.
   */
  onSubmit?: (response: QuestionResponse) => void
}

/** Nút chọn một phương án — dùng chung cho chẩn đoán và hành động. */
function ChoiceButton({
  text,
  selected,
  onPick,
}: {
  text: LText
  selected: boolean
  onPick: () => void
}) {
  return (
    <button
      onClick={onPick}
      aria-pressed={selected}
      className={`rounded-md border px-4 py-2.5 text-left text-sm transition-colors duration-(--dur) ${
        selected
          ? 'border-accent bg-panel-hover font-semibold text-ink'
          : 'border-edge bg-panel text-ink hover:border-accent hover:bg-panel-hover'
      }`}
    >
      {lt(text)}
    </button>
  )
}

export function ClinicRoom({ question, onSubmit }: ClinicRoomProps) {
  const t = useT()
  const spec = question.spec
  const [diagnosisIndex, setDiagnosisIndex] = useState<number | null>(null)
  // Pha sửa mở MỘT LẦN rồi ở lại — đổi chẩn đoán không unmount phòng lab
  // (unmount là mất sạch sơ đồ đang sửa dở).
  const [fixOpened, setFixOpened] = useState(false)
  const [actionIndex, setActionIndex] = useState<number | null>(null)
  // Sơ đồ sống của pha sửa — terminal và "chạy lại triệu chứng" soi vào
  // đây, nên ping trong terminal thấy ngay hiệu quả của mối sửa vừa làm.
  const [topology, setTopology] = useState<Topology>(spec.patient.topology)
  const [symptom, setSymptom] = useState<'unknown' | 'sick' | 'cleared'>('unknown')

  const patient: ClinicPatient = useMemo(() => ({ ...spec.patient, topology }), [spec, topology])

  // Hỏi qua `phanMang` chứ không so `kind === 'edit-network'`: ca liên
  // tầng cũng có nửa sửa sơ đồ, so tay là nó mất phòng lab.
  const labSpec: LabSpec | null = useMemo(() => {
    const mang = phanMang(spec.fix)
    return mang === null
      ? null
      : { initial: spec.patient.topology, goals: mang.goals, allow: mang.allow, solution: mang.solution }
  }, [spec])

  /** Ca này còn đòi chọn hành động cho nửa bệnh ngoài mô hình mạng không. */
  const canChonHanhDong = spec.fix.kind !== 'edit-network'

  const handleTopologyChange = useCallback((next: Topology) => {
    setTopology(next)
    setSymptom('unknown') // sơ đồ đổi thì kết quả khám cũ hết giá trị
  }, [])

  const recheckSymptom = () => {
    setSymptom(checkSymptom(spec, topology).sick ? 'sick' : 'cleared')
  }

  const seat = findDevice(spec.patient.topology, spec.patient.seatId)
  const host = seat?.kind === 'pc' ? seat.hostname : spec.patient.seatId

  const submit = () => {
    if (onSubmit === undefined || diagnosisIndex === null) return
    if (spec.fix.kind === 'edit-network') {
      onSubmit({ kind: 'clinic', diagnosisIndex, fix: { kind: 'edit-network', topology } })
      return
    }
    if (actionIndex === null) return
    if (spec.fix.kind === 'edit-and-act') {
      onSubmit({ kind: 'clinic', diagnosisIndex, fix: { kind: 'edit-and-act', topology, actionIndex } })
      return
    }
    onSubmit({ kind: 'clinic', diagnosisIndex, fix: { kind: 'choose-action', actionIndex } })
  }

  const submitReady = diagnosisIndex !== null && (!canChonHanhDong || actionIndex !== null)

  const submitRow = onSubmit !== undefined && (
    <div className="flex flex-wrap items-center gap-3 rounded-md border border-edge bg-panel px-4 py-3">
      <Button onClick={submit} disabled={!submitReady}>
        {t('lab.submit')}
      </Button>
      <span className="text-xs text-ink-muted">{t('lab.submitHint')}</span>
    </div>
  )

  return (
    <div className="space-y-4">
      <p className="flex items-start gap-2 text-sm text-ink-muted">
        <HeartPulse size={16} aria-hidden className="mt-0.5 shrink-0 text-accent" />
        {t('clinic.seatLine', { host })}
      </p>

      <ClinicTerminal patient={patient} />

      {/* Ca trung cấp khai deviceConsole: khám bằng CẢ hai terminal trên
          cùng sơ đồ sống (spec v2 mục 4.2) — console phía thiết bị chỉ-đọc. */}
      {spec.deviceConsole === true && <ClinicDeviceConsole topology={topology} />}

      {!fixOpened ? (
        <div className="flex flex-col gap-3 rounded-md border border-edge bg-panel p-4">
          <p className="flex items-center gap-2 text-sm font-semibold text-ink">
            <Stethoscope size={16} aria-hidden className="text-accent" />
            {t('clinic.diagnosisTitle')}
          </p>
          <p className="text-xs text-ink-muted">{t('clinic.diagnosisHint')}</p>
          <div className="flex flex-col gap-2">
            {question.diagnosis.choices.map((choice, i) => (
              <ChoiceButton
                key={i}
                text={choice}
                selected={diagnosisIndex === i}
                onPick={() => setDiagnosisIndex(i)}
              />
            ))}
          </div>
          <div>
            <Button disabled={diagnosisIndex === null} onClick={() => setFixOpened(true)}>
              {t('clinic.diagnosisLock')}
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2 rounded-md border border-edge bg-panel p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
            {t('clinic.diagnosisChosen')}
          </p>
          {/* Vẫn đổi được chẩn đoán — chip chọn lại tại chỗ, pha sửa giữ nguyên. */}
          <div className="flex flex-wrap gap-2">
            {question.diagnosis.choices.map((choice, i) => (
              <button
                key={i}
                onClick={() => setDiagnosisIndex(i)}
                aria-pressed={diagnosisIndex === i}
                className={`rounded-full border px-3 py-1 text-xs transition-colors duration-(--dur) ${
                  diagnosisIndex === i
                    ? 'border-accent bg-panel-hover font-semibold text-ink'
                    : 'border-edge text-ink-muted hover:border-accent hover:text-ink'
                }`}
              >
                {lt(choice)}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Pha sửa dựng theo TỪNG NỬA, không rẽ nhánh một-hoặc-hai: ca liên
          tầng có cả hai nửa, và người học phải thấy chúng đứng cạnh nhau
          để hiểu là chưa xong khi mới làm một bên. */}
      {fixOpened && (
        <div className="space-y-3">
          <p className="text-sm text-ink-muted">
            {spec.fix.kind === 'edit-and-act'
              ? t('clinic.fixIntroBoth')
              : labSpec !== null
                ? t('clinic.fixIntroEdit')
                : t('clinic.fixIntroAction')}
          </p>

          {labSpec !== null && (
            <>
              <NetworkLab spec={labSpec} hideDiagnosis onTopologyChange={handleTopologyChange} />
              <div className="flex flex-wrap items-center gap-3 rounded-md border border-edge bg-panel px-4 py-3">
                <Button variant="ghost" onClick={recheckSymptom}>
                  {t('clinic.symptomRecheck')}
                </Button>
                {symptom !== 'unknown' && (
                  <span
                    role="status"
                    className={`text-sm font-medium ${symptom === 'sick' ? 'text-warn' : 'text-ok'}`}
                  >
                    {symptom === 'sick' ? t('clinic.symptomStillSick') : t('clinic.symptomCleared')}
                  </span>
                )}
                {/* Ca liên tầng: triệu chứng xanh MỚI CHỈ nói nửa mạng đã
                    thông. Không nói câu này thì màu xanh thành lời hứa sai. */}
                {spec.fix.kind === 'edit-and-act' && symptom === 'cleared' && (
                  <span className="text-xs text-ink-muted">{t('clinic.symptomHalfOnly')}</span>
                )}
              </div>
            </>
          )}

          {canChonHanhDong && (
            <div className="flex flex-col gap-2 rounded-md border border-edge bg-panel p-4">
              {spec.fix.kind === 'edit-and-act' && (
                <p className="text-sm font-semibold text-ink">{t('clinic.actionTitleOutside')}</p>
              )}
              {(question.actions?.choices ?? []).map((choice, i) => (
                <ChoiceButton
                  key={i}
                  text={choice}
                  selected={actionIndex === i}
                  onPick={() => setActionIndex(i)}
                />
              ))}
            </div>
          )}

          {submitRow}
        </div>
      )}
    </div>
  )
}
