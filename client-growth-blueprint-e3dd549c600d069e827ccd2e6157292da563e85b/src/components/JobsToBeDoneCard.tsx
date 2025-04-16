
import React from "react";
import { JobsToBeDone } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, CheckCircle2, AlertTriangle, Lightbulb } from "lucide-react";

interface JobsToBeDoneCardProps {
  data: JobsToBeDone;
}

const JobsToBeDoneCard: React.FC<JobsToBeDoneCardProps> = ({ data }) => {
  return (
    <Card className="shadow-lg border-t-4 border-t-lcm-red">
      <CardHeader className="pb-2">
        <div className="flex items-center">
          <Briefcase className="h-5 w-5 text-lcm-red mr-2" />
          <CardTitle className="text-xl font-bold">Key Struggles & Jobs To Be Done</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="bg-white rounded-lg border-2 border-lcm-gray-1 overflow-hidden">
            <div className="bg-lcm-gray-1 p-3">
              <div className="flex items-center">
                <AlertTriangle className="text-amber-500 h-5 w-5 mr-2" />
                <h3 className="text-lg font-semibold text-lcm-white">Primary Struggles</h3>
              </div>
            </div>
            <div className="p-4">
              <ul className="space-y-2">
                {data.struggles.map((struggle, idx) => (
                  <li key={idx} className="bg-amber-50 p-3 rounded-md border-l-4 border-amber-400">
                    {struggle}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-lg border-2 border-lcm-gray-1 overflow-hidden">
            <div className="bg-lcm-gray-1 p-3">
              <div className="flex items-center">
                <CheckCircle2 className="text-green-500 h-5 w-5 mr-2" />
                <h3 className="text-lg font-semibold text-lcm-white">Jobs To Be Done</h3>
              </div>
            </div>
            <div className="p-4">
              <ul className="space-y-2">
                {data.jobs.map((job, idx) => (
                  <li key={idx} className="bg-green-50 p-3 rounded-md border-l-4 border-green-400">
                    {job}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-lg border-2 border-lcm-gray-1 overflow-hidden">
            <div className="bg-lcm-gray-1 p-3">
              <div className="flex items-center">
                <Lightbulb className="text-yellow-500 h-5 w-5 mr-2" />
                <h3 className="text-lg font-semibold text-lcm-white">Best Marketing Angle</h3>
              </div>
            </div>
            <div className="p-4">
              <p className="italic text-gray-700 bg-yellow-50 p-4 rounded-md border-l-4 border-yellow-400">
                {data.marketingAngle}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobsToBeDoneCard;
