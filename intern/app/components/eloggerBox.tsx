import { v4 as uuidv4 } from "uuid";
import EngagementLogger from "./elogger";
import EngagementLoggerCard from "./Engagementlogger";

export default function EngagementLoggerBox({ EngagementInfo,}: {EngagementInfo: object[] | null;}) 
 {
  console.log(`rendering Engagemetlogger box`)
  if (!EngagementInfo) {
    console.log('null card data')
    return null;
  } else {
    console.log('running map function to render cards')
    return (
      <div className="h-[500px] overflow-auto rounded-2xl">
        {EngagementInfo.map((loggerPersonal: any) => (
          <EngagementLoggerCard key={uuidv4()} cardObject={loggerPersonal} />
        ))}
      </div>
    );
  }
}