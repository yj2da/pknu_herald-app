import IPhoneFrame from '@/components/IPhoneFrame';
import NewsFeed from '@/components/NewsFeed';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F2F2F7] dark:bg-black flex items-center justify-center p-4 sm:p-8">
      <div className="scale-[0.85] sm:scale-100 origin-center transition-transform duration-500">
        <IPhoneFrame>
          <NewsFeed />
        </IPhoneFrame>
      </div>
    </main>
  );
}
