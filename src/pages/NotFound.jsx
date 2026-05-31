import { useLanguage } from '../hooks/useLanguage.js'

export default function NotFound() {
  const { t } = useLanguage()

  return <div className="p-8 text-2xl">{t('common.not_found')}</div>
}
