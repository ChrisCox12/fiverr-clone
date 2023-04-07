import './gigs.css';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../../utils/axios';


export default function Gigs() {
    const queryClient = useQueryClient();
    const query = useQuery({
        queryKey: ['repoData'],
        queryFn: fetchGigs
    });

    async function fetchGigs() {
        try {
            const data = await axiosInstance.get('gigs');
            return data;
        } 
        catch(error) {
            console.log(error)    
        }
    }

    //console.log(query)

    return (
        <div>Gigs page</div>
    )
}