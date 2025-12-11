import {useQuery} from '@tanstack/react-query';
import { getCurrentUser } from '../services/authServices';
import { useAuthStore } from '../stores/authStore';

export const useAuthChecker = ()=>{
    return useQuery({
        queryKey:["me"],
        queryFn:getCurrentUser,
        retry:false,
        staleTime:1000 * 60 * 5, // revalidate every 5 mins
        refetchOnWindowFocus: true,// refetch if user switches back to the  tab
        refetchInterval:1000 * 60 * 5, // refetch after every 5 min
        onSuccess:(data)=>{
            if (data.customerId){
            useAuthStore.getState().login();
            }
        },
        onError:()=>{
            useAuthStore.getState().logout();
        }
    })
};
