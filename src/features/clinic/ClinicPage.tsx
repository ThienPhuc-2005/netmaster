// Tab Phòng khám — Phase 3. Đã chốt: hiện nhưng KHÓA, màn úp mở gợi
// tò mò (Zeigarnik) về những "bệnh nhân" mạng hỏng đang chờ.

import { Stethoscope } from 'lucide-react'
import { useT } from '../../i18n'
import { EmptyState } from '../../components/EmptyState'

export function ClinicPage() {
  const t = useT()
  return (
    <>
      <h1 className="mb-6 text-xl font-bold">{t('clinic.title')}</h1>
      <EmptyState icon={Stethoscope} title={t('clinic.lockedTitle')} body={t('clinic.lockedBody')} />
    </>
  )
}
