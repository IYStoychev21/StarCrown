import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"


export default function Nav({ avaratImage, userName }: { avaratImage: string, userName: string }) {
    return (
        <>
            <div className="text-white mt-4 ml-8 relative">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink className="hover:text-white" href="/library">Library</BreadcrumbLink> 
                        </BreadcrumbItem>
                    </BreadcrumbList> 
                </Breadcrumb>

                <div className="absolute right-4 top-0 flex text-white items-center justify-center gap-4">
                    <h1 className="font-bold">{userName}</h1>
                    <Avatar>
                        <AvatarImage src={avaratImage} alt="avatar" />
                        <AvatarFallback className="bg-blue-400">{userName[0]}</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </>
    )
}