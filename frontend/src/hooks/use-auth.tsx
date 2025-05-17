import { createContext, useContext, useState, useEffect } from 'react';
import { useAccount } from 'wagmi';

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  address: string | undefined;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  address: undefined,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { address, isConnected, isConnecting, isDisconnected } = useAccount();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // When wagmi has determined the connection state, update loading
    if (!isConnecting) {
      setIsLoading(false);
    }
  }, [isConnecting]);

  const value = {
    isAuthenticated: isConnected,
    isLoading,
    address,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);