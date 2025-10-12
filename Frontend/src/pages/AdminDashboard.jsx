import React, { useState } from "react";
import {
  Users,
  BarChart3,
  CheckCircle,
  XCircle,
  Shield,
  TrendingUp,
  UserCheck,
  UserX,
  ClipboardList,
} from "lucide-react";

const AdminDashboard = () => {
  const [vendors, setVendors] = useState([
    { id: 1, name: "Ali Raza", category: "Plumber", status: "Pending" },
    { id: 2, name: "Ahmed Khan", category: "Electrician", status: "Approved" },
    { id: 3, name: "Bilal Ahmed", category: "Mechanic", status: "Disapproved" },
  ]);

  const stats = {
    totalVendors: vendors.length,
    approved: vendors.filter((v) => v.status === "Approved").length,
    pending: vendors.filter((v) => v.status === "Pending").length,
    disapproved: vendors.filter((v) => v.status === "Disapproved").length,
  };

  const handleStatusChange = (id, newStatus) => {
    setVendors(
      vendors.map((v) => (v.id === id ? { ...v, status: newStatus } : v))
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        {/* Header Banner */}
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-3xl p-8 mb-8 shadow-2xl">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

          <div className="relative flex flex-col md:flex-row items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                  <Shield className="text-white" size={32} />
                </div>
                Admin Dashboard 🧑‍💼
              </h1>
              <p className="text-blue-100 text-lg">
                Manage vendors, approvals, and monitor platform performance
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-all hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-xl">
                <Users className="text-blue-600" size={28} />
              </div>
              <TrendingUp className="text-green-500" size={20} />
            </div>
            <p className="text-gray-600 text-sm font-medium mb-1">
              Total Vendors
            </p>
            <p className="text-3xl font-bold text-gray-800">
              {stats.totalVendors}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition-all hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-xl">
                <UserCheck className="text-green-600" size={28} />
              </div>
              <CheckCircle className="text-green-500" size={20} />
            </div>
            <p className="text-gray-600 text-sm font-medium mb-1">
              Approved Vendors
            </p>
            <p className="text-3xl font-bold text-gray-800">{stats.approved}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-yellow-500 hover:shadow-xl transition-all hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-yellow-100 p-3 rounded-xl">
                <ClipboardList className="text-yellow-600" size={28} />
              </div>
              <BarChart3 className="text-yellow-500" size={20} />
            </div>
            <p className="text-gray-600 text-sm font-medium mb-1">
              Pending Approvals
            </p>
            <p className="text-3xl font-bold text-gray-800">{stats.pending}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-red-500 hover:shadow-xl transition-all hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-red-100 p-3 rounded-xl">
                <UserX className="text-red-600" size={28} />
              </div>
              <XCircle className="text-red-500" size={20} />
            </div>
            <p className="text-gray-600 text-sm font-medium mb-1">
              Disapproved Vendors
            </p>
            <p className="text-3xl font-bold text-gray-800">
              {stats.disapproved}
            </p>
          </div>
        </div>

        {/* Vendor Management Table */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-xl">
              <ClipboardList className="text-white" size={24} />
            </div>
            Manage Vendors
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-left">
                  <th className="p-4 rounded-l-lg">Name</th>
                  <th className="p-4">Category</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-center rounded-r-lg">Actions</th>
                </tr>
              </thead>
              <tbody>
                {vendors.map((v) => (
                  <tr
                    key={v.id}
                    className="border-b hover:bg-blue-50 transition-colors"
                  >
                    <td className="p-4 font-semibold text-gray-800">
                      {v.name}
                    </td>
                    <td className="p-4 text-gray-700">{v.category}</td>
                    <td className="p-4 text-center">
                      <span
                        className={`px-4 py-2 rounded-full text-xs font-bold ${
                          v.status === "Approved"
                            ? "bg-green-100 text-green-700"
                            : v.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {v.status}
                      </span>
                    </td>
                    <td className="p-4 text-center flex justify-center gap-4">
                      {v.status !== "Approved" && (
                        <button
                          onClick={() => handleStatusChange(v.id, "Approved")}
                          className="bg-green-100 text-green-700 px-3 py-2 rounded-lg hover:bg-green-200 font-semibold flex items-center gap-2"
                        >
                          <CheckCircle size={16} /> Approve
                        </button>
                      )}
                      {v.status !== "Disapproved" && (
                        <button
                          onClick={() =>
                            handleStatusChange(v.id, "Disapproved")
                          }
                          className="bg-red-100 text-red-700 px-3 py-2 rounded-lg hover:bg-red-200 font-semibold flex items-center gap-2"
                        >
                          <XCircle size={16} /> Disapprove
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
