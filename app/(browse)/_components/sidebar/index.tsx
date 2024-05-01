import { Wrapper } from "./wrapper";
import { Toggle } from "./toggle";
import { Recommended, RecommendedSkeleton } from "./recommended";
import { getRecommendedService } from "@/lib/recommended-service";
export const Sidebar = async() => {
    const recommended = await getRecommendedService();
    return(
        <Wrapper>
            <Toggle />
            <div className="space-y-4 pt-4 lg:pt-0">
                <Recommended data={recommended}/>

            </div>
        </Wrapper>
    );
};

export const SidebarSkeleton = () => {
    return(
        <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50">
            <RecommendedSkeleton />
        </aside>
    );
};