import Clsx from 'clsx'

export default function SkeletonCard({isLoading}:{isLoading?:boolean}){
    return (
        <div className={Clsx(
            'flex flex-col shadow-lg h-96 bg-slate-800 p-5 text-gray-300',
            {'max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700':
                isLoading
            }

        )}>
            <div className='relative max-h-72 flex-1 bg-zinc-700'/>
            <div className='flex justify-between font-bold my-3 bg-zinc-700'/>
            <div className='h-3 w-8/12 rounded-md bg-zinc-700'/>
        </div>
    )
}