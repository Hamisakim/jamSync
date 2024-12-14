import Image from 'next/image';
import Link from 'next/link';
export default function Home() {
  const data = [
    {
      id: 1,
      title: 'Welcome to My Project',
      description: 'This is a placeholder description for my project.',
      imageUrl: '/path/to/image.jpg',
    },
  ];

  return (
    <div className="container mx-auto">
      <Link href="/jams">
        Jams
      </Link>

      {data.map((item) => (
        <div key={item.id} className="my-4">
          <h1 className="text-2xl font-bold">{item.title}</h1>
          <p className="mt-2">{item.description}</p>
          <Image
            src={item.imageUrl}
            alt="Placeholder Image"
            width={500}
            height={300}
          />
        </div>
      ))}
    </div>
  );
}
