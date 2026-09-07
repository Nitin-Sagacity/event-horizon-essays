'use client';

import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useTranslations } from 'next-intl';

export default function CommentBox({ articleSlug }: { articleSlug: string }) {
  const t = useTranslations('Comments');
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const submitComment = async () => {
    if (!comment.trim()) return;
    setStatus('loading');

    // Transmit the data to your Supabase table
    const { error } = await supabase
      .from('comments')
      .insert([
        {
          article_slug: articleSlug,
          author_name: 'Anonymous Explorer', // Hardcoded until we build user logins
          content: comment,
        }
      ]);

    if (error) {
      console.error(error);
      setStatus('error');
    } else {
      setComment('');
      setStatus('success');
    }
  };

  return (
    <section className="bg-deepspace p-6 rounded border border-shadow mt-8">
      <h3 className="font-heading text-xl text-violet mb-4">{t('header')}</h3>
      <textarea
        className="w-full bg-void border border-shadow rounded p-4 text-moonwhite focus:border-orchid outline-none mb-4"
        placeholder={t('placeholder')}
        rows={3}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        disabled={status === 'loading'}
      />
      <div className="flex items-center gap-4">
        <button
          onClick={submitComment}
          disabled={status === 'loading'}
          className="bg-orchid text-void font-bold px-6 py-2 rounded hover:bg-starlight transition-colors disabled:opacity-50"
        >
          {status === 'loading' ? 'Transmitting...' : t('submit')}
        </button>
        {status === 'success' && <span className="text-starlight text-sm font-heading tracking-wide">Transmission received.</span>}
        {status === 'error' && <span className="text-red-400 text-sm font-heading tracking-wide">Signal lost. Try again.</span>}
      </div>
    </section>
  );
}