import { Routes, Route } from "react-router-dom";
import { useUserLocation } from "../hooks/useUserLocation";
import ProtectedRoute from "./ProtectedRoute";

import Layout from "../components/layout/Layout";
import DashboardLayout from "../components/dashboard/DashboardLayout";

import Home from "../pages/public/Home";
import Books from "../pages/public/Books";
import About from "../pages/public/About";

import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";

import DashboardHome from "../pages/dashboard/home/DashboardHome";

import BooksList from "../pages/dashboard/books/BooksList";
import BookCreate from "../pages/dashboard/books/BookCreate";
import BookEdit from "../pages/dashboard/books/BookEdit";

import StoreCatalog from "../pages/dashboard/store/StoreCatalog";
import StoreInfo from "../pages/dashboard/store/StoreInfo";
import StoreEdit from "../pages/dashboard/store/StoreEdit";

import EmployeesList from "../pages/dashboard/employees/EmployeesList";
import EmployeeEdit from "../pages/dashboard/employees/EmployeeEdit";

import UsersList from "../pages/dashboard/users/UsersList";
import UserEdit from "../pages/dashboard/users/UserEdit";

// Componente para páginas do dashboard, que precisam de autenticação e layout específico
function DashboardPage({
  children,
  location,
  allowAdmin,
  allowOwner,
  allowEmployee,
}: {
  children: React.ReactNode;
  location: string;

  allowAdmin?: boolean;
  allowOwner?: boolean;
  allowEmployee?: boolean;
}) {
  return (
    <ProtectedRoute
      allowAdmin={allowAdmin}
      allowOwner={allowOwner}
      allowEmployee={allowEmployee}
    >
      <DashboardLayout location={location}>
        {children}
      </DashboardLayout>
    </ProtectedRoute>
  );
}

export default function AppRoutes() {

  const location = useUserLocation();

  return (
    <Routes>
      
      {/* Home */}
      <Route path="/" element={
          <Layout pageTitle="Sebo" location={location}>
            <Home />
          </Layout>
        }
      />

      {/* Books List (Public) */}
      <Route path="/books" element={
          <Layout pageTitle="Livros" location={location}>
            <Books />
          </Layout>
        }
      />

      {/* About */}
      <Route path="/about" element={
          <Layout pageTitle="Sobre" location={location}>
            <About />
          </Layout>
        }
      />
      
      {/* Login */}
      <Route path="/login" element={<Login />} />
      
      {/* Signup */}
      <Route path="/signup" element={<Signup />} />

      
      {/* Dashboard Home */}
      <Route path="/dashboard" element={
          <DashboardPage location={location}>
            <DashboardHome />
          </DashboardPage>
        }
      />
      
      {/* Books List */}
      <Route path="/dashboard/books" element={
          <DashboardPage location={location} allowAdmin>
            <BooksList />
          </DashboardPage>
        }
      />

      {/* Book Create */}
      <Route path="/dashboard/books/create" element={
          <DashboardPage location={location} allowAdmin allowOwner allowEmployee>
            <BookCreate />
          </DashboardPage>
        }
      />

      {/* Book Edit */}
      <Route path="/dashboard/books/:id/edit" element={
          <DashboardPage location={location} allowAdmin allowOwner allowEmployee>
            <BookEdit />
          </DashboardPage>
        }
      />

      {/* Store Catalog */}
      <Route path="/dashboard/stores/:id/catalog" element={
          <DashboardPage location={location} allowAdmin allowOwner allowEmployee>
            <StoreCatalog />
          </DashboardPage>
        }
      />
      
      {/* Stores List (Admin Global) */}
      <Route path="/dashboard/stores" element={
          <DashboardPage location={location} allowAdmin>
            <StoreInfo /> 
          </DashboardPage>
        }
      />

      {/* Store Info / Catalog List */}
      <Route path="/dashboard/stores/:id" element={
          <DashboardPage location={location} allowAdmin allowOwner allowEmployee>
            <StoreInfo />
          </DashboardPage>
        }
      />

      {/* Store Edit */}
      <Route path="/dashboard/stores/:id/edit" element={
          <DashboardPage location={location} allowAdmin allowOwner>
            <StoreEdit />
          </DashboardPage>
        }
      />
      
      {/* Employees List */}
      <Route path="/dashboard/employees" element={
          <DashboardPage location={location} allowAdmin allowOwner >
            <EmployeesList />
          </DashboardPage>
        }
      />

      {/* Employee Edit */}
      <Route path="/dashboard/employees/:id/edit" element={
          <DashboardPage location={location} allowAdmin allowOwner>
            <EmployeeEdit />
          </DashboardPage>
        }
      />

      
      {/* Users List */}
      <Route path="/dashboard/users" element={
          <DashboardPage location={location} allowAdmin>
            <UsersList />
          </DashboardPage>
        }
      />

      {/* User Edit */}
      <Route path="/dashboard/users/:id/edit" element={
          <DashboardPage location={location} allowAdmin>
            <UserEdit />
          </DashboardPage>
        }
      />
    </Routes>
  );
}