import { SATLAB_URL } from './navigation'

export { SATLAB_URL }

export const SATLAB = {
  pitch:
    'A satellite simulator I am building in the open — orbital propagation, ground tracks, pass prediction and link budgets, in the browser.',
  why: [
    'Orbital mechanics is one of the few fields where the maths is entirely public, the data is free, and the good tools are either desktop software from 2004 or a proprietary licence. There is room for something that runs in a browser tab and explains itself while it works.',
    'I am learning this as I go, so SatLab is being built alongside the notes rather than after them. Every piece of it starts as something I had to work out — and those working-outs are the Space notes.',
  ],
  capabilities: [
    'Orbital mechanics',
    'TLE / SGP4',
    'Ground tracks',
    'Pass prediction',
    'Link budgets',
    'Visualisation',
  ],
  roadmap: [
    {
      phase: 'Phase 1',
      title: 'Propagation core',
      status: 'In progress',
      detail:
        'TLE parsing, SGP4 propagation, TEME to Earth-fixed conversion, and a ground track that closes correctly at the dateline.',
    },
    {
      phase: 'Phase 2',
      title: 'Passes and visibility',
      status: 'Next',
      detail:
        'Observer geometry: elevation and azimuth over time, acquisition and loss of signal, and a pass table for a given ground station.',
    },
    {
      phase: 'Phase 3',
      title: 'Link budgets',
      status: 'Planned',
      detail:
        'Slant-range path loss across a whole pass, antenna patterns, and the margin curve that tells you which part of the pass is actually usable.',
    },
    {
      phase: 'Phase 4',
      title: 'Constellations',
      status: 'Planned',
      detail:
        'Many satellites at once, coverage maps over time, and revisit statistics for a target on the ground.',
    },
  ],
} as const
