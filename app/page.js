// @ts-nocheck
'use client';
import React, { useState, useEffect } from 'react';

export default function LeadershipMirror() {
  const brand = { bg: 'bg-neutral-50', font: 'font-serif', text: 'text-black' };
  const scaleLabels = ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'];
  const handleSelect = (index, value) => {
  setResponses((prev) => ({ ...prev, [index]: value }));
};

  const questions = [
    // Awareness (5)
    { text: 'I regularly reflect on how my emotions impact my leadership decisions.', category: 'Awareness' },
    { text: 'I seek and act on honest feedback from others, even when uncomfortable.', category: 'Awareness' },
    { text: 'I stay calm and centered under pressure or crisis.', category: 'Awareness' },
    { text: 'I know what triggers me and have tools to shift my state quickly.', category: 'Awareness' },
    { text: 'I am aware of how my presence affects my team or environment.', category: 'Awareness' },
    // Resilience (5)
    { text: 'I bounce back quickly from professional setbacks or disappointments.', category: 'Resilience' },
    { text: 'I have effective ways to restore myself after high‑stress periods.', category: 'Resilience' },
    { text: 'I stay focused and present even when demands are high.', category: 'Resilience' },
    { text: 'I set and maintain boundaries to protect my time and energy.', category: 'Resilience' },
    { text: 'I feel calm and grounded even when things get chaotic around me.', category: 'Resilience' },
    // Clarity (5)
    { text: 'I have a clear, compelling vision that inspires me daily.', category: 'Clarity' },
    { text: 'My team knows exactly where we’re going and why it matters.', category: 'Clarity' },
    { text: 'I make decisions quickly and with conviction, even under pressure.', category: 'Clarity' },
    { text: 'I take time to zoom out regularly and see the bigger picture.', category: 'Clarity' },
    { text: 'I know the difference between what’s urgent and what’s truly important.', category: 'Clarity' },
    // Horizon (5)
    { text: 'I actively invest in my personal and leadership growth.', category: 'Horizon' },
    { text: 'I have a long‑term vision that excites and stretches me.', category: 'Horizon' },
    { text: 'I take time to imagine and plan for the future.', category: 'Horizon' },
    { text: 'I embrace reinvention as part of my leadership journey.', category: 'Horizon' },
    { text: 'I have a clear sense of the legacy I want to create.', category: 'Horizon' },
  ];

  const dimensions = ['Awareness', 'Resilience', 'Clarity', 'Horizon'];

  const archetypes = { 
    Firefighter: {
    tagline: 'The heroic problem-solver always on call',
    superpower: 'Rapid action & high-pressure resilience',
    blindspot: 'Reactive culture, hidden burnout',
    insight: 'What if you stopped being the hero and built systems that rarely catch fire?',
    description:
      'You thrive under pressure and are at your best in a crisis. But constant problem-solving can trap you in survival mode, leaving no space to elevate or evolve.',
    patterns: [
      'Highly reactive, always "on"',
      'Struggles to delegate and slow down',
      'Feels essential, but often overwhelmed',
    ],
    actions: [
      'Build systems to prevent recurring issues',
      'Practice saying "no" and creating breathing room',
      'Shift from heroic rescuer to empowered strategist',
    ],
  },
  Lighthouse: {
    tagline: 'The visionary beacon who sometimes stands alone',
    superpower: 'Unshakable purpose & clear long-term vision',
    blindspot: 'Emotional distance, hard to reach',
    insight: 'Bring people into the light, not just toward it.',
    description:
      'You radiate clarity and conviction, inspiring others from afar. But your elevated view can isolate you, making emotional connection a challenge.',
    patterns: [
      'Clear vision, but feels alone at the top',
      'Struggles to connect with team at a deeper level',
      'Tends to guide rather than collaborate',
    ],
    actions: [
      'Invite emotional connection and feedback',
      'Share more vulnerably to deepen trust',
      'Balance inspiration with co-creation',
    ],
  },
  Strategist: {
    tagline: 'The master planner three moves ahead',
    superpower: 'Precision, logic, systemic thinking',
    blindspot: 'Avoids vulnerability & emotional risk',
    insight: 'Your next evolution may not be smarter — it may be softer.',
    description:
      'You excel in structure, planning, and execution — but may avoid uncertainty and emotion. Growth lies in embracing what logic alone can’t solve.',
    patterns: [
      'Overplans, underfeels',
      'Struggles to trust intuition',
      'Seeks control over flow',
    ],
    actions: [
      'Lean into discomfort as a teacher',
      'Prioritize people over process at times',
      'Let emotions inform, not derail, your strategy',
    ],
  },
  Phoenix: {
    tagline: 'The rebuilder rising from reinvention',
    superpower: 'Resilience, deep personal growth',
    blindspot: 'Over-identifying with struggle',
    insight: 'Lead as if the new chapter is already true.',
    description:
      'You’ve grown through fire and emerged stronger, wiser. But you may unconsciously recreate struggle as your identity. True evolution requires ease.',
    patterns: [
      'Feels stronger *after* breakdowns',
      'Wary of calm — looks for the next storm',
      'Deeply self-aware but hesitant to celebrate progress',
    ],
    actions: [
      'Celebrate stability as a strength',
      'Design a future not driven by pain',
      'Trust that growth doesn’t require breakdown',
    ],
  },
  Seeker: {
    tagline: 'Exploring the edges of your leadership',
    superpower: 'Curiosity & openness',
    blindspot: 'Lack of focused direction',
    insight: 'Clarity emerges when commitment meets curiosity.',
    description:
      'You’re open, reflective, and eager to grow — but can feel untethered without direction. You’re ready to claim your next chapter with intention.',
    patterns: [
      'Many interests, unclear focus',
      'Big heart, not always bold action',
      'Seeks growth, but avoids decisions',
    ],
    actions: [
      'Choose one bold step this month',
      'Name the leader you’re becoming',
      'Move from inner work to outer expression',
    ],
  },
 };

  const [responses, setResponses] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [sent, setSent] = useState(false);

  useEffect(() => {
  if (submitted) {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }
}, [submitted]);

  const calcScores = () => {
    const totals = { Awareness: 0, Resilience: 0, Clarity: 0, Horizon: 0 };
    const counts = { ...totals };
    questions.forEach((q, i) => {
      const val = parseInt(responses[i] || '0', 10);
      totals[q.category] += val;
      counts[q.category]++;
    });
    const out = {};
    dimensions.forEach((d) => (out[d] = Math.round((totals[d] / (counts[d] * 5)) * 100)));
    return out;
  };

  const determineArchetype = (s) => {
    const HIGH = 70, LOW = 60;
    const { Awareness, Resilience, Clarity, Horizon } = s;
    if (Awareness >= HIGH && Resilience >= HIGH && Clarity >= HIGH && Horizon >= HIGH) return 'Lighthouse';
    if (Awareness < LOW && Resilience >= HIGH) return 'Firefighter';
    if (Clarity >= HIGH && (Awareness < LOW || Resilience < LOW)) return 'Lighthouse';
    if (Clarity >= HIGH && Horizon < LOW) return 'Strategist';
    if (Resilience >= HIGH && Clarity < LOW) return 'Phoenix';
    const [top] = Object.entries(s).sort((a, b) => b[1] - a[1]);
    if (top[0] === 'Resilience') return 'Firefighter';
    if (top[0] === 'Clarity') return 'Lighthouse';
    if (top[0] === 'Horizon') return 'Strategist';
    return 'Seeker';
  };

  const scores = calcScores();
  const archetype = determineArchetype(scores);
  const a = archetypes[archetype];

  return (
    <main className={`${brand.bg} ${brand.font} ${brand.text} min-h-screen flex flex-col items-center p-6`}>

      {submitted ? (
        <div className="w-full max-w-3xl space-y-6">
          <h1 className="text-3xl font-bold text-center mb-12">Your Inner Edge™ Leadership Mirror<br /><br />Your A.R.C.H™ Scores</h1>

          {dimensions.map((d) => (
            <div key={d} className="bg-white rounded-2xl shadow p-4">
              <h2 className="text-xl font-semibold mb-5">{d}</h2>
              <div className="w-full bg-neutral-200 h-4 rounded">
                <div className="h-4 rounded bg-orange-500" style={{ width: `${scores[d]}%` }} />
              </div>
              <p className="mt-1 text-sm font-medium">{scores[d]}%</p>
            </div>
          ))}

          <div className="bg-white rounded-2xl shadow p-6 border-t-4 border-orange-500 space-y-3">
            <h2 className="text-2xl font-bold">Archetype: {archetype}</h2>
            <p className="italic">{a.tagline}</p>
            <p>{a.description}</p>
            <div className="grid md:grid-cols-3 gap-4 text-sm pt-4">
              <div><p className="font-semibold mb-1">Superpower</p><p>{a.superpower}</p></div>
              <div><p className="font-semibold mb-1">Blind Spot</p><p>{a.blindspot}</p></div>
              <div><p className="font-semibold mb-1">Key Insight</p><p>{a.insight}</p></div>
            </div>
            <div className="pt-4 text-sm">
              <p className="font-semibold">Patterns:</p>
              <ul className="list-disc list-inside">{a.patterns.map((p,i)=><li key={i}>{p}</li>)}</ul>
              <p className="font-semibold mt-3">Suggested Actions:</p>
              <ul className="list-disc list-inside">{a.actions.map((act,i)=><li key={i}>{act}</li>)}</ul>
            </div>
          </div>

          <div className="text-center pt-4 space-y-8">
            <p className="font-medium">
              You’ve uncovered your unique leadership edge — your strengths, your growth areas, and the patterns shaping your impact.
              <br />Remember, the most powerful leaders don’t just see their challenges —
              <span className="font-bold"> they lean into their insights and take bold actions to grow.</span>
              <br />
            </p>

            {!sent ? (
              <form
                className="bg-white max-w-md mx-auto p-6 rounded-xl shadow space-y-4"
                style={{ backgroundColor: '#F2EFE8' }}
                onSubmit={async (e) => {
                  e.preventDefault();
                  const result = await fetch('/api/subscribe', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: userName, email: userEmail, archetype }),
                  });
                  if (result.ok) setSent(true);
                }}
              >
                <p className="text-base text-center">
                  If you’d like a copy of <strong>Your extended results</strong> in your inbox, enter your full name and email below.<br />
                  <strong>Don’t refresh</strong> this page or you’ll lose the data.
                </p>
                <input
                  type="text"
                  placeholder="Full name"
                  value={userName}
                  onChange={(e)=>setUserName(e.target.value)}
                  required
                  className="w-full border rounded px-3 py-2"
                />
                <input
                  type="email"
                  placeholder="Email address"
                  value={userEmail}
                  onChange={(e)=>setUserEmail(e.target.value)}
                  required
                  className="w-full border rounded px-3 py-2"
                />
                <button type="submit" className="w-full bg-black hover:bg-orange-600 text-white font-semibold py-2 rounded-full">
                  Send my extended report
                </button>
              </form>
            ) : (
              <p className="font-medium">✅ Thanks! Your personalized report will arrive shortly.</p>
            )}
          <p className="font-medium"> If you’re ready to explore your Inner Edge™ more deeply, gain personalized guidance, and create a clear action plan, <strong>I invite you to book a one‑on‑one</strong> Leadership Mirror call.</p>
            <a
              href="https://laszlobella.com/#BOOK_1"
              className="inline-block px-6 py-3 rounded-full font-semibold bg-orange-500 text-white hover:bg-orange-600 transition"
            >
              Want to dive deeper? Book Your Leadership Mirror Call
            </a>
          </div>
        </div>

      ) : (
        <div className="w-full max-w-3xl space-y-8">
          <h1 className="text-3xl font-bold text-center mb-10">The Inner Edge™ Leadership Mirror</h1>
          <p className="text-center max-w-2xl mx-auto">
            This tool helps you reflect on four essential dimensions of your leadership: Awareness, Resilience, Clarity, and Horizon.
            By completing this short assessment, <span className="font-bold">you’ll receive insights into your leadership archetype</span> —
            plus a personalized mirror of your strengths, blind spots, and growth opportunities.<br /><br />
            To get the most accurate and meaningful results, take a moment to slow down.<br /><strong>Be present. Be fully open and honest in your answers.</strong><br /><br />
            On the next page, you’ll see your Leadership Archetype and can <strong>request your extended report by email.</strong>
          </p>

          {questions.map((q, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow p-4">
              <p className="font-medium mb-3">{idx + 1}. {q.text}</p>
              <div className="flex justify-between mb-2">
                {[1,2,3,4,5].map((n)=>(
                  <button
                    key={n}
                    onClick={()=>handleSelect(idx,String(n))}
                    className={`w-10 h-10 rounded-full border flex items-center justify-center transition ${
                      responses[idx]===String(n)?'bg-orange-500 text-white':'border-neutral-300 hover:bg-neutral-200'
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
              <div className="flex justify-between">
                {scaleLabels.map((label,i)=>(
                  <span key={i} className="w-10 text-center text-xs">{label}</span>
                ))}
              </div>
            </div>
          ))}

          <button
            onClick={()=>setSubmitted(true)}
            disabled={Object.keys(responses).length < questions.length}
            className={`w-full py-3 rounded-full text-lg font-semibold transition ${
              Object.keys(responses).length < questions.length
                ? 'bg-neutral-400 cursor-not-allowed'
                : 'bg-orange-500 hover:bg-orange-600 text-white'
            }`}
          >
            Reveal My Mirror
          </button>
        </div>
      )}
    </main>
  );
}
