interface ClassCardProps {
  name: string;
  students: string[];
}
export default function classCard({ name, students }: ClassCardProps) {
  return (
    <div className='classCard'>
      <h1>{name}</h1>
      <ul>
        {students.map((student) => {
          return <li key={student}>{student}</li>;
        })}
      </ul>
    </div>
  );
}
