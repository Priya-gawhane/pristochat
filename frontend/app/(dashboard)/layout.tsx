import { Suspense } from "react"
import { AppSidebar } from "@/components/Sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { ConversationsProvider } from "@/contexts/ConversationsContext"


export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <ConversationsProvider>
            <SidebarProvider>
                <Suspense>
                    <AppSidebar />
                </Suspense>
                <main className="w-full no-scrollbar">
                    <SidebarTrigger className="fixed z-10" />
                    <Suspense>
                        {children}
                    </Suspense>
                </main>
            </SidebarProvider>
        </ConversationsProvider>
    )
}