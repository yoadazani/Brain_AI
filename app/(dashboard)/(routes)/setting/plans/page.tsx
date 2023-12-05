import {PlanCard} from "@/components/pages/setting/plans/planCard";
import {plansData} from "@/data/plansData";
import {checkUserSubscription} from "@/services/actions/userSubscription/checkUserSubscription";

const Plans = async () => {

    const isPro = await checkUserSubscription()

    return <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 md:px-8">
        {
            plansData.map(({title, description, planOptions, price}) => (
                <PlanCard
                    key={title}
                    title={title}
                    description={description}
                    planOptions={planOptions}
                    price={price}
                    isPro={isPro}
                />
            ))
        }
    </div>
}

export default Plans