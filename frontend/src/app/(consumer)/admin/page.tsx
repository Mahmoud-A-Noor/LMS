import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatNumber } from "@/utils/formatters/formatNumber";
import { formatPrice } from "@/utils/formatters/formatPrice";
import { serverApi } from "@/utils/serverApi";
import { ReactNode } from "react";

export default async function AdminDashboard() {
  const {
    netSales,
    totalRefunds,
    netPurchases,
    refundedPurchases,
    avgPurchasesPerCustomer,
} = await getPurchaseDetails()

const {
  userCount,
  courseCount
} = await getTotalStudentsAndCourses()

  return (
    <div className="container my-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 md:grid-cols-4 gap-4">
        <StatCard title="Net Sales">
          {formatPrice(netSales)}
        </StatCard>
        <StatCard title="Refunded Sales">
          {formatPrice(totalRefunds)}
        </StatCard>
        <StatCard title="Un-refunded Purchases">
          {formatNumber(netPurchases)}
        </StatCard>
        <StatCard title="Refunded Purchases">
          {formatNumber(refundedPurchases)}
        </StatCard>
        <StatCard title="Purchases Per User">
          {formatNumber(avgPurchasesPerCustomer, {
            maximumFractionDigits: 2
          })}
        </StatCard>
        <StatCard title="Students">
          {formatNumber(userCount)}
        </StatCard>
        <StatCard title="Courses">
          {formatNumber(courseCount)}
        </StatCard>
      </div>
    </div>
  );
}


function StatCard({title, children} : {title: string, children: ReactNode}){
  return <Card>
    <CardHeader className="text-center">
      <CardDescription>{title}</CardDescription>
        <CardTitle className="font-bold text-2xl">{children}</CardTitle>
    </CardHeader>
  </Card>
}

async function getTotalStudentsAndCourses(){
  const {response, error} = await serverApi("/user-course-accesses/total-students-courses", "GET")
  return response?.data as {
    userCount: number,
    courseCount: number
  }
}

async function getPurchaseDetails(){
  const {response, error} = await serverApi("/purchases/stats", "GET")
  return response?.data as {
    netSales: number,
    totalRefunds: number,
    netPurchases: number,
    refundedPurchases: number,
    avgPurchasesPerCustomer: number,
}
}
