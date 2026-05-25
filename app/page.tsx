import IPhoneFrame from '@/components/IPhoneFrame';
import NewsFeed from '@/components/NewsFeed';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 dark:bg-black flex items-center justify-center py-10">
      <IPhoneFrame>
        <NewsFeed />
      </IPhoneFrame>
    </main>
  );
}
