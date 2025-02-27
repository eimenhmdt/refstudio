import { ReferenceItem } from '../types/ReferenceItem';

export function ReferencesView({ onRefClicked }: { onRefClicked?: (item: ReferenceItem) => void }) {
  return (
    <div className='flex flex-col h-full w-full'>
      <h1>References</h1>
      <div className='flex-1 overflow-scroll'>
        <p className="my-4 italic">Click on a reference to add it to the document.</p>

        <ul className="divide-y-2 border">
          {REFS_DATABASE.map((reference) => (
            <li
              key={reference.id}
              className="mb-0 cursor-pointer p-1 hover:bg-slate-100"
              onClick={() => onRefClicked && onRefClicked(reference)}
            >
              <strong>{reference.id}</strong> - {reference.title}
              <br />
              <small>
                <em>
                  {reference.author}, {reference.year} by {reference.publisher}
                </em>
              </small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const REFS_DATABASE: ReferenceItem[] = [
  {
    id: 'ref1',
    title: 'Artificial Intelligence: A Modern Approach',
    author: 'Stuart Russell, Peter Norvig',
    year: 2016,
    publisher: 'Pearson',
  },
  {
    id: 'ref2',
    title: 'Deep Learning',
    author: 'Ian Goodfellow, Yoshua Bengio, Aaron Courville',
    year: 2016,
    publisher: 'MIT Press',
  },
  {
    id: 'ref3',
    title: 'Machine Learning: A Probabilistic Perspective',
    author: 'Kevin P. Murphy',
    year: 2012,
    publisher: 'MIT Press',
  },
  {
    id: 'ref4',
    title: 'Pattern Recognition and Machine Learning',
    author: 'Christopher M. Bishop',
    year: 2006,
    publisher: 'Springer',
  },
  {
    id: 'ref5',
    title: 'Reinforcement Learning: An Introduction',
    author: 'Richard S. Sutton, Andrew G. Barto',
    year: 2018,
    publisher: 'MIT Press',
  },
];
