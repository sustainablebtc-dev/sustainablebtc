// Styles
import styles from "@/styles/pages/OurTeam.module.scss";

// Next/React
import Link from "next/link";
import Image from "next/image";

// Sanity
import { urlFor } from "@/sanity/sanity-urlFor";

// Lib
import { PortableText } from "@portabletext/react";

// Image

const OurTeam = ({ teamData }: { teamData: any }) => {
   return (
      <section className={`${styles.team} hero`}>
         <div className={`${styles.container} container`}>
            {/* Our Team */}
            <div className={styles.sbpTeam}>
               {/* Heading */}
               <div className={`${styles.teamHeading} heading heading-2`}>
                  <PortableText value={teamData.sbpTeam.sbpTeamHeading} />
               </div>

               {/* Members */}
               <div className={`${styles.members}`}>
                  {teamData.sbpTeam.sbpTeamMember.map((member: any) => (
                     <>
                        <div className={styles.memberCard}>
                           {/* Image */}
                           <Image
                              src={urlFor(member.sbpTeamMemberImage).url()}
                              alt={member.sbpTeamMemberImage.alt}
                              className={styles.memberImage}
                              width={150}
                              height={150}
                           />

                           {/* Name */}
                           <h3
                              className={`${styles.memberHeading} heading heading-5`}
                           >
                              {member.sbpTeamMemberName}
                           </h3>

                           {/* Designation */}
                           <p className={`${styles.memberDesignation} para`}>
                              {member.sbpTeamMemberDesignation}
                           </p>

                           {/* Linkedin */}
                           {member.sbpTeamMemberLinkedIn && (
                              <a
                                 href={`${member.sbpTeamMemberLinkedIn}`}
                                 className={`${styles.memberLinkedIn}`}
                                 title="View Profile"
                                 target="_BLANK"
                              >
                                 <i className="bi bi-linkedin"></i>
                              </a>
                           )}

                           {/* Separator */}
                           <div className={styles.memberSeparator}></div>

                           {/* Experience */}
                           <div className={styles.memberExperience}>
                              {member.sbpTeamMemberExperience &&
                                 member.sbpTeamMemberExperience.map(
                                    (logo: any) => (
                                       <>
                                          <Image
                                             src={urlFor(logo).url()}
                                             alt={logo.alt}
                                             width={100}
                                             height={50}
                                             title={logo.alt}
                                          />
                                       </>
                                    )
                                 )}
                           </div>
                        </div>
                     </>
                  ))}
               </div>
            </div>

            {/* Our Advisor */}
            <div className={styles.sbpAdvisors}>
               {/* Heading */}
               <div className={`${styles.teamHeading} heading heading-2`}>
                  <PortableText
                     value={teamData.sbpAdvisors.sbpAdvisorsHeading}
                  />
               </div>
               {/* Members */}
               <div className={`${styles.members}`}>
                  {teamData.sbpAdvisors.sbpAdvisorsMember.map((member: any) => (
                     <>
                        <div className={styles.memberCard}>
                           {/* Image */}
                           <Image
                              src={urlFor(member.sbpAdvisorsMemberImage).url()}
                              alt={member.sbpAdvisorsMemberImage.alt}
                              className={styles.memberImage}
                              width={150}
                              height={150}
                           />

                           {/* Name */}
                           <h3
                              className={`${styles.memberHeading} heading heading-5`}
                           >
                              {member.sbpAdvisorsMemberName}
                           </h3>

                           {/* Designation */}
                           <p className={`${styles.memberDesignation} para`}>
                              {member.sbpAdvisorsMemberDesignation}
                           </p>

                           {/* Linkedin */}
                           {member.sbpAdvisorsMemberLinkedIn && (
                              <a
                                 href={`${member.sbpAdvisorsMemberLinkedIn}`}
                                 className={`${styles.memberLinkedIn}`}
                                 title="View Profile"
                                 target="_BLANK"
                              >
                                 <i className="bi bi-linkedin"></i>
                              </a>
                           )}

                           {member.sbpAdvisorsMemberExperience && (
                              <>
                                 {/* Separator */}
                                 <div className={styles.memberSeparator}></div>

                                 {/* Experience */}
                                 <div className={styles.memberExperience}>
                                    {member.sbpAdvisorsMemberExperience &&
                                       member.sbpAdvisorsMemberExperience.map(
                                          (logo: any) => (
                                             <>
                                                <Image
                                                   src={urlFor(logo).url()}
                                                   alt={logo.alt}
                                                   width={100}
                                                   height={50}
                                                   title={logo.alt}
                                                />
                                             </>
                                          )
                                       )}
                                 </div>
                              </>
                           )}
                        </div>
                     </>
                  ))}
               </div>
            </div>
         </div>
      </section>
   );
};

export default OurTeam;
