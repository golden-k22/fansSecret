

import HomeScreen from "@/components/home/home-screen/HomeScreen";


export default async function Search({params}:any) {
    const query = params.query
 
        console.log("Query Params: ", query);
  
	return <main>{ <HomeScreen query={query} /> }</main>;
}
