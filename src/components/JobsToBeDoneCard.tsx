
import React from "react";
import { JobsToBeDone } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, CheckCircle2, AlertTriangle } from "lucide-react";

interface JobsToBeDoneCardProps {
  data: JobsToBeDone;
}

const JobsToBeDoneCard: React.FC<JobsToBeDoneCardProps> = ({ data }) => {
  return (
    <Card className="shadow-lg border-t-4 border-t-vbf-purple">
      <CardHeader className="pb-2">
        <div className="flex items-center">
          <Briefcase className="h-5 w-5 text-vbf-purple mr-2" />
          <CardTitle className="text-xl font-bold">Key Struggles & Jobs To Be Done</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <div className="flex items-center mb-3">
              <AlertTriangle className="text-amber-500 h-5 w-5 mr-2" />
              <h3 className="text-lg font-semibold text-vbf-blue">Primary Struggles</h3>
            </div>
            <ul className="space-y-2">
              {data.struggles.map((struggle, idx) => (
                <li key={idx} className="bg-amber-50 p-3 rounded-md border-l-4 border-amber-400">
                  {struggle}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex items-center mb-3">
              <CheckCircle2 className="text-green-500 h-5 w-5 mr-2" />
              <h3 className="text-lg font-semibold text-vbf-blue">Jobs To Be Done</h3>
            </div>
            <ul className="space-y-2">
              {data.jobs.map((job, idx) => (
                <li key={idx} className="bg-green-50 p-3 rounded-md border-l-4 border-green-400">
                  {job}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-vbf-blue p-4 rounded-lg text-white">
            <h3 className="font-semibold mb-2">Best Marketing Angle</h3>
            <p className="italic">{data.marketingAngle}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobsToBeDoneCard;
