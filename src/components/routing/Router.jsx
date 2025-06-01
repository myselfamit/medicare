import React, { useState, useEffect, createContext, useContext } from 'react';

// Router Context
const RouterContext = createContext();

// Custom hook to use router
export const useRouter = () => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a Router');
  }
  return context;
};

// Custom Router Component
export const Router = ({ children }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [searchParams, setSearchParams] = useState(new URLSearchParams(window.location.search));

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
      setSearchParams(new URLSearchParams(window.location.search));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path, options = {}) => {
    if (path !== currentPath) {
      if (options.replace) {
        window.history.replaceState({}, '', path);
      } else {
        window.history.pushState({}, '', path);
      }
      setCurrentPath(path);
      setSearchParams(new URLSearchParams(path.split('?')[1] || ''));
    }
  };

  const goBack = () => {
    window.history.back();
  };

  const goForward = () => {
    window.history.forward();
  };

  const value = {
    currentPath,
    searchParams,
    navigate,
    goBack,
    goForward
  };

  return (
    <RouterContext.Provider value={value}>
      <div data-current-path={currentPath}>
        {typeof children === 'function' ? children(value) : children}
      </div>
    </RouterContext.Provider>
  );
};

// Route Component
export const Route = ({ path, component: Component, exact = false, children }) => {
  const { currentPath } = useRouter();
  
  const isMatch = exact 
    ? currentPath === path 
    : currentPath.startsWith(path);

  if (!isMatch) return null;

  if (Component) {
    return <Component />;
  }

  return children || null;
};

// Routes Component
export const Routes = ({ children }) => {
  const { currentPath } = useRouter();
  
  let matchedRoute = null;

  React.Children.forEach(children, (child) => {
    if (!matchedRoute && React.isValidElement(child)) {
      const { path, exact = false } = child.props;
      const isMatch = exact 
        ? currentPath === path 
        : currentPath.startsWith(path);
      
      if (isMatch) {
        matchedRoute = child;
      }
    }
  });

  return matchedRoute;
};

// Link Component
export const Link = ({ to, children, className, onClick }) => {
  const { navigate } = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    if (onClick) onClick(e);
    navigate(to);
  };

  return (
    <a href={to} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};