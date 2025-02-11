"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { UserRound, TrendingUp, AlertTriangle, PiggyBank, Download, Send } from 'lucide-react';

const BankingDashboardNew = () => {
  // Existing state management
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportOptions, setReportOptions] = useState({
    segmentation: false,
    dormancy: false,
    transactions: false,
    growth: false
  });

  // New state for action flow
  const [actionMessage, setActionMessage] = useState('');
  const [selectedAction, setSelectedAction] = useState(null);

  // Sample demographic data
  const ageGroups = [
    { group: '15-25', count: 450 },
    { group: '26-35', count: 820 },
    { group: '36-45', count: 650 },
    { group: '46-55', count: 380 },
    { group: '56+', count: 180 }
  ];

  const regions = [
    { name: 'Greater Accra', count: 180 },
    { name: 'Ashanti', count: 220 },
    { name: 'Central', count: 150 },
    { name: 'Western', count: 180 },
    { name: 'Volta', count: 220 },
    { name: 'Brong-Ahafo', count: 150 },
    { name: 'Northern', count: 180 },
    { name: 'Eastern', count: 220 },
    { name: 'Upper East', count: 150 },
    { name: 'Upper West', count: 180 },
  ];

  const genderDistribution = [
    { gender: 'Male', count: 1350 },
    { gender: 'Female', count: 1130 }
  ];

  const maritalStatus = [
    { status: 'Single', count: 1480 },
    { status: 'Married', count: 1000 }
  ];

  // Existing sample data
  const customerSegments = [
    { name: 'High Value', value: 30 },
    { name: 'Mid Value', value: 45 },
    { name: 'Low Value', value: 25 },
  ];

  const monthlyTrends = [
    { month: 'Jan', customers: 1200, transactions: 3800 },
    { month: 'Feb', customers: 1350, transactions: 4200 },
    { month: 'Mar', customers: 1500, transactions: 4600 },
    { month: 'Apr', customers: 1400, transactions: 4300 },
    { month: 'May', customers: 1600, transactions: 4800 },
    { month: 'Jun', customers: 1800, transactions: 5200 },
  ];

  const dormancyRisk = [
    { category: 'Active', count: 850 },
    { category: 'At Risk', count: 120 },
    { category: 'Dormant', count: 30 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  // Action flow handlers
  const handleActionSelect = (actionType) => {
    setSelectedAction(actionType);
    let defaultMessage = '';
    switch(actionType) {
      case 'personalized':
        defaultMessage = 'Dear valued customer, based on your spending patterns, we have exclusive savings product offers tailored just for you...';
        break;
      case 'retention':
        defaultMessage = 'We miss seeing you! Here are some exciting features you might have missed...';
        break;
      case 'upgrade':
        defaultMessage = 'Congratulations! You qualify for our premium banking services...';
        break;
    }
    setActionMessage(defaultMessage);
  };

  const handleDownloadCustomerList = () => {
    // Implementation for downloading customer list
    console.log('Downloading customer list for:', selectedAction);
  };

  const handleSendMessages = () => {
    // Implementation for sending messages
    console.log('Sending messages to customers:', {
      actionType: selectedAction,
      message: actionMessage
    });
  };

  // Existing handlers
  const handleCheckboxChange = (option) => {
    setReportOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }));
  };

  const handleGenerateReport = () => {
    console.log('Generating report with:', {
      startDate,
      endDate,
      reportOptions
    });
    setIsReportModalOpen(false);
  };

  return (
    <div className="p-4 max-w-7xl mx-auto space-y-4">
      {/* Header section remains the same */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Customer Insights Dashboard</h1>
        <button 
          onClick={() => setIsReportModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <TrendingUp className="h-5 w-5" />
          <span>Get AI-powered Report</span>
        </button>

        {/* Report Modal remains the same */}
        {isReportModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Generate AI Report</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Start Date</label>
                  <input 
                    type="date" 
                    className="w-full p-2 border rounded-md"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">End Date</label>
                  <input 
                    type="date" 
                    className="w-full p-2 border rounded-md"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Include in Report</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input 
                        type="checkbox" 
                        className="mr-2"
                        checked={reportOptions.segmentation}
                        onChange={() => handleCheckboxChange('segmentation')}
                      /> 
                      Customer Segmentation Analysis
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="checkbox" 
                        className="mr-2"
                        checked={reportOptions.dormancy}
                        onChange={() => handleCheckboxChange('dormancy')}
                      /> 
                      Dormancy Risk Predictions
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="checkbox" 
                        className="mr-2"
                        checked={reportOptions.transactions}
                        onChange={() => handleCheckboxChange('transactions')}
                      /> 
                      Transaction Pattern Insights
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="checkbox" 
                        className="mr-2"
                        checked={reportOptions.growth}
                        onChange={() => handleCheckboxChange('growth')}
                      /> 
                      Growth Opportunities
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button 
                  onClick={() => setIsReportModalOpen(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleGenerateReport}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Stats remain the same */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <UserRound className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
            <div className="text-2xl font-bold">19,438</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
            <div className="text-2xl font-bold">1,850</div>
            <p className="text-xs text-muted-foreground">9.52% of total</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">At Risk</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
            <div className="text-2xl font-bold">120</div>
            <p className="text-xs text-muted-foreground">Needs attention</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Customer Value</CardTitle>
            <PiggyBank className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
            <div className="text-2xl font-bold">$7,549</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="segments">Customer Segments</TabsTrigger>
          <TabsTrigger value="predictions">AI Predictions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Monthly Trends Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Trends</CardTitle>
            </CardHeader>
            <CardContent className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="customers" stroke="#8884d8" name="Total Customers" />
                  <Line yAxisId="right" type="monotone" dataKey="transactions" stroke="#82ca9d" name="Transactions" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* New Demographics Section */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Age Distribution</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ageGroups}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="group" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Regional Distribution</CardTitle>
              </CardHeader>
              <CardContent className="h-[500px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={regions} 
                    layout="vertical"
                    margin={{ top: 20, right: 30, left: 70, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={true} />
                    <XAxis 
                      type="number"
                      domain={[0, 'dataMax + 20']}
                      tickCount={6}
                    />
                    <YAxis 
                      dataKey="name" 
                      type="category"
                      width={10}
                      tick={{ fontSize: 12 }}
                      interval={0}
                    />
                    <Tooltip 
                      formatter={(value) => [`${value} customers`, 'Count']}
                      labelStyle={{ color: 'black' }}
                    />
                    <Bar 
                      dataKey="count" 
                      fill="#82ca9d"
                      radius={[0, 4, 4, 0]}
                      barSize={20}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Gender Distribution</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={genderDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                      nameKey="gender"
                      label={({gender, count}) => `${gender}: ${count}`}
                    >
                      {genderDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value, name) => [value, name]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Marital Status</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={maritalStatus}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                      nameKey="status"
                      label={({status, count}) => `${status}: ${count}`}
                    >
                      {maritalStatus.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value, name) => [value, name]}/>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="segments" className="space-y-4">
          {/* Existing segments content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
                <CardHeader>
                <CardTitle>Customer Segments Distribution</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                    <Pie
                        data={customerSegments}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({name, value}) => `${name}: ${value}%`}
                    >
                        {customerSegments.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                    </PieChart>
                </ResponsiveContainer>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                <CardTitle>Customer State Analysis</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dormancyRisk}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
                </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>AI-Powered Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <Alert className="mb-4">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Dormancy Risk Alert</AlertTitle>
                    <AlertDescription>
                    20 high-value customers showing signs of reduced activity. Recommended action: Initiate personalized engagement campaign.
                    </AlertDescription>
                </Alert>
                <Alert className="mb-4">
                    <TrendingUp className="h-4 w-4" />
                    <AlertTitle>Growth Opportunity</AlertTitle>
                    <AlertDescription>
                    15% of mid-tier customers qualify for premium service upgrades based on their transaction patterns.
                    </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Next Best Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="border-l-4 border-blue-500 pl-4 cursor-pointer hover:bg-gray-50">
                        <h4 className="font-semibold">Personalized Offers</h4>
                        <p className="text-sm text-gray-600">Generate targeted savings product offers for 150 customers based on their spending patterns</p>
                        <Button 
                          variant="outline" 
                          className="mt-2"
                          onClick={() => handleActionSelect('personalized')}
                        >
                          Take Action
                        </Button>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Send Personalized Offers</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Button 
                          variant="outline" 
                          onClick={handleDownloadCustomerList}
                          className="w-full"
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download Customer List
                        </Button>
                        <Textarea
                          value={actionMessage}
                          onChange={(e) => setActionMessage(e.target.value)}
                          placeholder="Customize your message..."
                          className="min-h-32"
                        />
                        <Button 
                          onClick={handleSendMessages}
                          className="w-full"
                        >
                          <Send className="mr-2 h-4 w-4" />
                          Send to All Qualified Customers
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="border-l-4 border-blue-500 pl-4 cursor-pointer hover:bg-gray-50">
                        <h4 className="font-semibold">Retention Campaign</h4>
                        <p className="text-sm text-gray-600">Launch retention campaign for 45 customers predicted to become dormant in the next 30 days</p>
                        <Button 
                          variant="outline" 
                          className="mt-2"
                          onClick={() => handleActionSelect('retention')}
                        >
                          Take Action
                        </Button>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Send Retention Campaigns</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Button 
                          variant="outline" 
                          onClick={handleDownloadCustomerList}
                          className="w-full"
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download Customer List
                        </Button>
                        <Textarea
                          value={actionMessage}
                          onChange={(e) => setActionMessage(e.target.value)}
                          placeholder="Customize your message..."
                          className="min-h-32"
                        />
                        <Button 
                          onClick={handleSendMessages}
                          className="w-full"
                        >
                          <Send className="mr-2 h-4 w-4" />
                          Send to All Qualified Customers
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="border-l-4 border-blue-500 pl-4 cursor-pointer hover:bg-gray-50">
                        <h4 className="font-semibold">Product Marketing</h4>
                        <p className="text-sm text-gray-600">75 customers eligible for premium account upgrades based on their transaction history</p>
                        <Button 
                          variant="outline" 
                          className="mt-2"
                          onClick={() => handleActionSelect('upgrade')}
                        >
                          Take Action
                        </Button>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Send Personalized Offers</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Button 
                          variant="outline" 
                          onClick={handleDownloadCustomerList}
                          className="w-full"
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download Customer List
                        </Button>
                        <Textarea
                          value={actionMessage}
                          onChange={(e) => setActionMessage(e.target.value)}
                          placeholder="Customize your message..."
                          className="min-h-32"
                        />
                        <Button 
                          onClick={handleSendMessages}
                          className="w-full"
                        >
                          <Send className="mr-2 h-4 w-4" />
                          Send to All Qualified Customers
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  {/* Similar Dialog components for Retention and Upgrade actions */}
                  {/* ... */}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BankingDashboardNew;