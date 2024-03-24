import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"


export default function Nav({ avaratImage, userName }: { avaratImage: string | undefined, userName: string | undefined}) {
    return (
        <>
            <div className="text-white ml-8 relative h-14 flex items-center">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink className="hover:text-white" href="/library">Library</BreadcrumbLink> 
                        </BreadcrumbItem>
                    </BreadcrumbList> 
                </Breadcrumb>

                <div className="absolute right-4 flex text-white items-center justify-center gap-4">
                    <h1 className="font-bold">{userName}</h1>
                    <Avatar>
                        <AvatarImage src={avaratImage} alt="avatar" />
                        {userName && <AvatarFallback className="bg-blue-400">{userName[0]}</AvatarFallback>}
                    </Avatar>
                </div>
            </div>
        </>
    )
}