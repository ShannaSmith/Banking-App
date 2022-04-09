const ProtectedRoute = ({
    user,
    redirectPath = '/landing',
    children,
  }) => {
    if (!user) {
      return <Navigate to={redirectPath} replace />;
    }
  
    return children ? children : <Outlet />;
  };
  