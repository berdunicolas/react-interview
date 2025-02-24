interface LoginLayoutProps{
    children: React.ReactNode
}

export default function LoginLayout({children}: LoginLayoutProps){
    return (
        <>
            <div className="h-100 gradient-bg font-reg d-flex justify-content-center align-items-center">
                <div className="d-flex flex-col pt-6 card border-0 bg-none bg-transparent" style={{width: "25rem"}}>
                    <div className="text-center">
                        <h1 className="display-1 text-header">
                            .logo
                        </h1>
                    </div>
                    <div className="mx-5 my-4">
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}