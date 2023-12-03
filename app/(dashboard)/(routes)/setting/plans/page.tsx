import {PlanCard} from "@/components/pages/setting/plans/planCard";
import {plansData} from "@/data/plansData";

const Plans = () => {
    return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 md:px-8">
        {
            plansData.map(({title, description, planOptions, price}) => (
                <PlanCard
                    key={title}
                    title={title}
                    description={description}
                    planOptions={planOptions}
                    price={price}
                />
            ))
        }
    </div>
}

export default Plans