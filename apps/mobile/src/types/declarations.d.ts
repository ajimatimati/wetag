declare namespace React {
  type FC<P = any> = any;
  type ReactNode = any;
  type Dispatch<A> = (value: A) => void;
  type SetStateAction<S> = S | ((prevState: S) => S);
}

declare module 'react' {
  export const useState: <T = any>(initial: T | (() => T)) => [T, (val: T | ((prev: T) => T)) => void];
  export const useEffect: (effect: () => void | (() => void), deps?: any[]) => void;
  export const createContext: <T = any>(defaultValue: T) => any;
  export const useContext: <T = any>(context: any) => T;
  export const useMemo: <T = any>(factory: () => T, deps?: any[]) => T;
  export const useCallback: <T = any>(callback: T, deps?: any[]) => T;
  export const useRef: <T = any>(initialValue?: T) => { current: T };
  export type FC<P = any> = any;
  export type ReactNode = any;
  export type Dispatch<A> = (value: A) => void;
  export type SetStateAction<S> = S | ((prevState: S) => S);
  const React: any;
  export default React;
}

declare module 'react-native' {
  export const View: any;
  export const Text: any;
  export const StyleSheet: any;
  export const TouchableOpacity: any;
  export const ScrollView: any;
  export const Image: any;
  export const TextInput: any;
  export const Alert: any;
  export const Linking: any;
  export const Platform: any;
  export const Share: any;
}

declare module 'expo-router' {
  export const useRouter: () => any;
  export const useLocalSearchParams: <T = any>() => T;
  export const Link: any;
  export const Stack: any;
  export const Tabs: any;
}

declare module 'lucide-react-native' {
  export const Home: any;
  export const Compass: any;
  export const Building: any;
  export const MessageSquare: any;
  export const MessageCircle: any;
  export const User: any;
  export const Shield: any;
  export const ShieldCheck: any;
  export const ShieldAlert: any;
  export const Wallet: any;
  export const Car: any;
  export const ArrowRight: any;
  export const ArrowLeft: any;
  export const ArrowUpRight: any;
  export const PlusCircle: any;
  export const Plus: any;
  export const FileCheck: any;
  export const ChevronRight: any;
  export const PhoneCall: any;
  export const Lock: any;
  export const LogOut: any;
  export const Landmark: any;
  export const Check: any;
  export const Zap: any;
  export const Droplets: any;
  export const Fuel: any;
  export const Clock: any;
  export const Users: any;
  export const CalendarCheck: any;
  export const Calendar: any;
  export const Share2: any;
  export const Sparkles: any;
  export const Search: any;
  export const MapPin: any;
  export const Sliders: any;
  export const SlidersHorizontal: any;
  export const RefreshCw: any;
  export const CheckCircle: any;
  export const CheckCircle2: any;
  export const AlertTriangle: any;
  export const Navigation: any;
  export const Copy: any;
  export const Send: any;
  export const X: any;
  export const Snowflake: any;
  export const Luggage: any;
  export const Upload: any;
  export const Key: any;
  export const FileText: any;
  export const CheckCheck: any;
  export const Radio: any;
  export const Heart: any;
  export const Star: any;
  export const Bath: any;
  export const Bed: any;
  export const Maximize2: any;
  export const Tag: any;
  export const ChevronDown: any;
  export const GraduationCap: any;
}

declare module 'expo-status-bar' {
  export const StatusBar: any;
}

declare module 'react-native-safe-area-context' {
  export const SafeAreaProvider: any;
  export const SafeAreaView: any;
  export const useSafeAreaInsets: () => { top: number; bottom: number; left: number; right: number };
}
