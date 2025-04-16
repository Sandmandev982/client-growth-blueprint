
import React from "react";
import { IdealClientProfile } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User } from "lucide-react";

interface IdealClientProfileCardProps {
  profile: IdealClientProfile;
}

const IdealClientProfileCard: React.FC<IdealClientProfileCardProps> = ({ profile }) => {
  return (
    <Card className="shadow-lg border-t-4 border-t-vbf-purple">
      <CardHeader className="pb-2">
        <div className="flex items-center">
          <User className="h-5 w-5 text-vbf-purple mr-2" />
          <CardTitle className="text-xl font-bold">Ideal Client Profile</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2 text-vbf-blue">Demographics</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-gray-50 p-3 rounded-md">
                <span className="text-sm font-medium text-gray-600">Age</span>
                <p>{profile.demographics.age}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-md">
                <span className="text-sm font-medium text-gray-600">Gender</span>
                <p>{profile.demographics.gender}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-md">
                <span className="text-sm font-medium text-gray-600">Location</span>
                <p>{profile.demographics.location}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-md">
                <span className="text-sm font-medium text-gray-600">Education</span>
                <p>{profile.demographics.education}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-md">
                <span className="text-sm font-medium text-gray-600">Income</span>
                <p>{profile.demographics.income}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-md">
                <span className="text-sm font-medium text-gray-600">Occupation</span>
                <p>{profile.demographics.occupation}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2 text-vbf-blue">Psychographics</h3>
            
            <div className="mb-4">
              <h4 className="text-md font-medium mb-1 text-vbf-blue/80">Values</h4>
              <div className="flex flex-wrap gap-2">
                {profile.psychographics.values.map((value, idx) => (
                  <Badge key={idx} variant="outline" className="bg-blue-50 text-blue-700 hover:text-blue-800">
                    {value}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <h4 className="text-md font-medium mb-1 text-vbf-blue/80">Interests</h4>
              <div className="flex flex-wrap gap-2">
                {profile.psychographics.interests.map((interest, idx) => (
                  <Badge key={idx} variant="outline" className="bg-green-50 text-green-700 hover:text-green-800">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <h4 className="text-md font-medium mb-1 text-vbf-blue/80">Goals</h4>
              <div className="flex flex-wrap gap-2">
                {profile.psychographics.goals.map((goal, idx) => (
                  <Badge key={idx} variant="outline" className="bg-purple-50 text-purple-700 hover:text-purple-800">
                    {goal}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <h4 className="text-md font-medium mb-1 text-vbf-blue/80">Challenges</h4>
              <div className="flex flex-wrap gap-2">
                {profile.psychographics.challenges.map((challenge, idx) => (
                  <Badge key={idx} variant="outline" className="bg-red-50 text-red-700 hover:text-red-800">
                    {challenge}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-md font-medium mb-1 text-vbf-blue/80">Motivations</h4>
              <div className="flex flex-wrap gap-2">
                {profile.psychographics.motivations.map((motivation, idx) => (
                  <Badge key={idx} variant="outline" className="bg-yellow-50 text-yellow-700 hover:text-yellow-800">
                    {motivation}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IdealClientProfileCard;
