import type { FC } from "react";
import { ContactDetails } from "./Contact";
// import { ResumeSkills } from "./Skills";
// import { ResumeSocials } from "./Socials";
import {ResumeEducation} from "@components/Resume/Education";

export const ResumeSider: FC = () => {
	return (
		<div className="w-2/6">
			<ContactDetails />
			{/*<ResumeSkills />*/}
			<ResumeEducation />
			{/*<ResumeSocials />*/}
		</div>
	);
};
