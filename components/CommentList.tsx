'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function CommentList({ articleSlug }: { articleSlug: string }) {
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      // Query the database for this specific article's comments
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('article_slug', articleSlug)
        .order('created_at', { ascending: false });

      if (data) setComments(data);
    };

    fetchComments();
  }, [articleSlug]);

  if (comments.length === 0) {
    return <p className="text-shadow mt-6 font-heading text-sm tracking-wide">No frequencies detected yet. Be the first.</p>;
  }

  return (
    <div className="mt-8 space-y-4">
      {comments.map((comment) => (
        <div key={comment.id} className="bg-void p-4 rounded border border-shadow">
          <p className="text-violet font-heading text-sm mb-2">{comment.author_name}</p>
          <p className="text-starlight/90 leading-relaxed">{comment.content}</p>
        </div>
      ))}
    </div>
  );
}