import { fetchAllBranches } from "@/app/lib/data";

export default async function Branch_Select() {
    
    const branchesDetails = await fetchAllBranches();

    return(
        <div className="relative">
            <select name="" id="">
            {branchesDetails.map((branch, index) => (
                <option key={index} value={branch.Branch_ID}>
                    {branch.Name}
                </option>
            ))}
            </select>
        </div>
    );
}