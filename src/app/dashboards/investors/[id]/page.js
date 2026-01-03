import { redirect } from 'next/navigation';
import InvestorDashboard from '@/components/Pages/Dashboard/investors/Index';
import { mockInvestors } from '@/lib/mockInvestors';

export default async function InvestorDashboardPage({ params }) {
  const { id } = await params;
  const investor = mockInvestors.find(inv => inv.id === id);

  if (!investor) {
    redirect('/sign-in');
  }

  return (
    <main>
      <InvestorDashboard id={id} />
    </main>
  );
}