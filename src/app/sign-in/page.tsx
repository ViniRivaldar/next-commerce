import { SignIn } from "@clerk/nextjs";

type SignIngTypesProps = {
    searchParams: {
        redirectUrl: string
    }
}
export default function SignInPage({searchParams:{redirectUrl}}:SignIngTypesProps){
    return(
        <section className="py-14">
            <div className="container mx-auto px-4">
                <div className="flex justify-center">
                    <SignIn signUpUrl='/sign-up' redirectUrl={redirectUrl}/>
                </div>
            </div>
        </section>
    )
}