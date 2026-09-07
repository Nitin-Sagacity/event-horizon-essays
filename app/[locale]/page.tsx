import {useTranslations} from 'next-intl';
import CommentBox from '../../components/CommentBox';
import CommentList from '../../components/CommentList';

export default function Home() {
  const t = useTranslations();

  return (
    <main className="min-h-screen max-w-4xl mx-auto px-6 py-12">
      <header className="flex justify-between items-center mb-16 border-b border-shadow pb-4">
        <h1 className="font-heading text-2xl tracking-widest text-starlight uppercase">
          {t('Navigation.title')}
        </h1>
        <button className="bg-navy hover:bg-violet transition-colors text-moonwhite px-4 py-2 rounded text-sm font-heading">
          {t('Navigation.login')}
        </button>
      </header>

      <article className="mb-24">
        <h2 className="font-heading text-3xl text-orchid mb-4">
          {t('Essays.human_survival.title')}
        </h2>
        <p className="leading-relaxed text-lg text-starlight/90">
          {t('Essays.human_survival.content')}
        </p>
        <CommentBox articleSlug="human_survival" />
        <CommentList articleSlug="human_survival" />
      </article>

      <article className="mb-24">
        <h2 className="font-heading text-3xl text-orchid mb-4">
          {t('Essays.religion_survival.title')}
        </h2>
        <p className="leading-relaxed text-lg text-starlight/90">
          {t('Essays.religion_survival.content')}
        </p>
        <CommentBox articleSlug="religion_survival" />
        <CommentList articleSlug="religion_survival" />
      </article>
    </main>
  );
}