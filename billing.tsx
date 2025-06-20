import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, CreditCard, Download, Star } from "lucide-react";

export default function Billing() {
  const [currentPlan, setCurrentPlan] = useState("contractor");

  const jobHistory = [
    {
      id: 1,
      title: "Kitchen Renovation - Westerville",
      subcontractor: "Emma Carter",
      completedDate: "2025-05-28",
      totalAmount: "$4,500",
      commission: "$225",
      status: "Paid"
    },
    {
      id: 2,
      title: "Bathroom Plumbing Install",
      subcontractor: "Liam Bennett",
      completedDate: "2025-05-22",
      totalAmount: "$2,800",
      commission: "$140",
      status: "Paid"
    },
    {
      id: 3,
      title: "Electrical Panel Upgrade",
      subcontractor: "Charlotte Hayes",
      completedDate: "2025-05-15",
      totalAmount: "$3,200",
      commission: "$160",
      status: "Paid"
    },
    {
      id: 4,
      title: "Deck Construction - Dublin",
      subcontractor: "Noah Peterson",
      completedDate: "2025-05-08",
      totalAmount: "$6,800",
      commission: "$340",
      status: "Paid"
    },
    {
      id: 5,
      title: "HVAC System Installation",
      subcontractor: "Olivia Sanders",
      completedDate: "2025-04-30",
      totalAmount: "$5,400",
      commission: "$270",
      status: "Paid"
    },
    {
      id: 6,
      title: "Flooring Installation - Grove City",
      subcontractor: "Ethan Clarke",
      completedDate: "2025-04-24",
      totalAmount: "$3,600",
      commission: "$180",
      status: "Paid"
    }
  ];

  const billingHistory = [
    { date: "2025-06-01", amount: "$75.00", plan: "Contractor Plan", status: "Paid" },
    { date: "2025-05-01", amount: "$75.00", plan: "Contractor Plan", status: "Paid" },
    { date: "2025-04-01", amount: "$75.00", plan: "Contractor Plan", status: "Paid" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Billing & Subscription
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          Manage your subscription, payment methods, and billing history
        </p>
      </div>

      {/* Current Plan */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Current Plan</h2>
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">Contractor Plan</h3>
                <p className="text-slate-600">$25/month + 5% commission</p>
                <p className="text-sm text-slate-500 mt-1">Next billing date: July 1, 2025</p>
              </div>
              <Badge variant="default" className="bg-blue-600">
                Active
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Job History & Commission */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Completed Jobs & Commission</h2>
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b">
                  <tr>
                    <th className="text-left p-4 font-medium text-slate-700">Job Title</th>
                    <th className="text-left p-4 font-medium text-slate-700">Subcontractor</th>
                    <th className="text-left p-4 font-medium text-slate-700">Completed</th>
                    <th className="text-left p-4 font-medium text-slate-700">Total Amount</th>
                    <th className="text-left p-4 font-medium text-slate-700">Commission (5%)</th>
                    <th className="text-left p-4 font-medium text-slate-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {jobHistory.map((job) => (
                    <tr key={job.id} className="border-b last:border-b-0">
                      <td className="p-4 font-medium">{job.title}</td>
                      <td className="p-4">{job.subcontractor}</td>
                      <td className="p-4">{job.completedDate}</td>
                      <td className="p-4 font-medium">{job.totalAmount}</td>
                      <td className="p-4 font-medium text-green-600">{job.commission}</td>
                      <td className="p-4">
                        <Badge variant="default" className="bg-green-100 text-green-800">
                          {job.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        
        {/* Commission Summary */}
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">$1,315</div>
              <div className="text-sm text-slate-600">Total Commission Paid</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">6</div>
              <div className="text-sm text-slate-600">Jobs Completed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-slate-900">$26,300</div>
              <div className="text-sm text-slate-600">Total Project Value</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Payment Methods</h2>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <CreditCard className="h-5 w-5 text-slate-500 mr-3" />
                <div>
                  <p className="font-medium">•••• •••• •••• 4242</p>
                  <p className="text-sm text-slate-500">Expires 12/27</p>
                </div>
              </div>
              <Badge variant="default">Primary</Badge>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" size="sm">
                Edit
              </Button>
              <Button variant="outline" size="sm">
                Add New Card
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Billing History */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Billing History</h2>
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b">
                  <tr>
                    <th className="text-left p-4 font-medium text-slate-700">Date</th>
                    <th className="text-left p-4 font-medium text-slate-700">Plan</th>
                    <th className="text-left p-4 font-medium text-slate-700">Amount</th>
                    <th className="text-left p-4 font-medium text-slate-700">Status</th>
                    <th className="text-left p-4 font-medium text-slate-700">Invoice</th>
                  </tr>
                </thead>
                <tbody>
                  {billingHistory.map((item, index) => (
                    <tr key={index} className="border-b last:border-b-0">
                      <td className="p-4">{item.date}</td>
                      <td className="p-4">{item.plan}</td>
                      <td className="p-4 font-medium">{item.amount}</td>
                      <td className="p-4">
                        <Badge variant="default" className="bg-green-100 text-green-800">
                          {item.status}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Button variant="ghost" size="sm" className="p-2">
                          <Download className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}