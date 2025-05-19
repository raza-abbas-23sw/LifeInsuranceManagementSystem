import React, { useState } from 'react';
import { 
  Accordion, 
  AccordionSummary, 
  AccordionDetails, 
  Typography, 
  TextField, 
  Box,
  Divider,
  Paper,
  InputAdornment,
  Fade,
  Grow,
  Zoom
} from '@mui/material';
import { 
  ExpandMore, 
  Search,
  HelpOutline,
  ContactSupport
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const FAQs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expanded, setExpanded] = useState(null);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // FAQ data
  const faqData = [
  {
    question: "1: Who Can Buy Life Insurance Policy",
    answer: "Any Pakistani Citizen above 18 years of age, who is eligible to enter into a valid contract, can apply for an insurance policy. Subject to certain conditions, a policy can also be taken on the life of a spouse or minor children."
  },
  {
    question: "2: What is a Whole Life Policy?",
    answer: "These are the simplest policies to understand. You pay a fixed premium every year based on your age and other factors; you earn increases in the policy's surrender value as the years roll by and your beneficiaries get a fixed benefit after you die. The policy takes you into old age for the same premium you started out with. Whole life insurance policies are valuable because they provide permanent protection and accumulate surrender values that can be used for emergencies or to meet specific objectives. The surrender value gives you an extra source of retirement money if you need it."
  },
  {
    question: "3: What is an Endowment policy?",
    answer: "An endowment policy is a life insurance contract designed to pay a lump sum amount after a specific term (on its 'maturity') or on death. It is a hybrid financial product that provides both life coverage and a savings plan."
  },
  {
    question: "4: What is a Three Payment Plan?",
    answer: "An endowment policy, which pays a part of the sum insured to the policyholder in the form of survival benefits at fixed intervals (1/3 term of the policy) before the maturity date. Despite these payments, the risk cover on the life of the policyholder continues for the full sum insured, and bonuses are calculated on the full sum insured. If the policyholder survives until the end of the policy term, the survival benefits are deducted from the maturity value."
  },
  {
    question: "5: What is an Annuity Scheme?",
    answer: "Annuity schemes are those wherein policyholders regular contributions over a period of time (or a one-time contribution) accumulate to form a pool with the insurance company. This pool is used to yield a regular income that is paid to policyholders until death starting from your desired age. Some annuity schemes have the option to pay your survivors a lump sum amount upon your death in addition to the regular income you receive while you are alive."
  },
  {
    question: "6: What are Medical and Non-Medical Schemes?",
    answer: "While applying for a policy, the applicant may be required to undergo a medical examination depending on their age and the Sum Assured. Such applications are processed under the Medical Scheme. Conversely, when a policy is offered without requiring a medical examination, based on the applicant's age and Sum Assured, these policies are processed under the Non-Medical Scheme."
  },
  {
    question: "7: What are the policies available for kids below the age of one year?",
    answer: "There are only two policies available for the newborn. These are Child Education and Marriage Assurance and Child Protection Assurance. Child Education and Marriage Assurance provides a lump sum benefit for the child at the completion of the policy term and also has a family income benefit in case of death of policyholder (Allah forbid). Child Protection Assurance is a joint life assurance and covers the lives of child and either of the parents. For these plans, age of the child should be above six months."
  },
  {
    question: "8: Is there any policy where the insured gets no money at the time of maturity?",
    answer: "Is there any policy where the insured gets no money at the time of maturity?"
  },
  {
    question: "9: What is Bonus?",
    answer: "State Life distributes its profits among its policyholders every year in the form of bonuses. Bonuses are credited to the account of the policyholders and paid at the time of maturity/death. Bonus is declared as a certain amount per thousand of sum assured. There are multiple types of bonuses SLIC pays to its Policyholders."
  },
  {
    question: "10: What are Survival Benefits?",
    answer: "In some policies, a part of the sum insured is paid to the policyholder in the form of Survival Benefits, at fixed intervals before the maturity date. The risk cover for life continues for the full sum insured even after payment of survival benefits and bonus is also calculated on the full sum insured. If the policyholder survives till the end of the term, the survival benefits will be deducted from maturity value."
  },
  {
    question: "11: What are the various modes of payment for premium?",
    answer: "Premiums other than single premiums can be paid by the policyholders to State Life in yearly, half-yearly, quarterly or monthly installments."
  },
  {
    question: "12: What is Surrender Value?",
    answer: "The amount payable by State Life on termination of the policy contract at the desire of the policyholder before the expiry of policy term is known as the surrender value of the policy. Policy will acquire a surrender value after it has been in-force for at least two consecutive years provided no premiums are in default. The bonus is also added to the surrender value if the policy has been in force for at least 3 years."
  },
  {
    question: "13: Whom is a death claim payable?",
    answer: "Death claim is usually payable to the nominee/ assignee or the legal successor, as the case may be. However, if the deceased policyholder has not nominated/ assigned the policy or not made a will, the claim is payable to the holder of a succession certificate or such evidence of title from a Court of Law."
  },
  {
    question: "14: What is Nomination/Assignment of a Policy?",
    answer: "Nomination/Assignment of a Policy refers to the designation of individuals who are legally entitled to receive the policy benefits upon the death of the policyholder. If the policy includes a nomination, the claim is settled in favor of the nominee. Likewise, if the policy is assigned, the assignee is entitled to receive the claim amount. It's important to note that assigning a policy automatically cancels any existing nomination. Therefore, if a policy is reassigned in favor of the policyholder, it's necessary to create a new nomination."
  },
  {
    question: "15: How do you effect a change of address and transfer of policy records?",
    answer: "When a policyholder wants to change his address in State Life records, notice of such change should be given to the zonal office servicing his policy. Policy records can be transferred from the zonal office that services the policy to any other zonal office nearest to the policyholder's place of residence. The correct address facilitates better services and quicker settlement of claims."
  },
  {
    question: "16: When does a policy lapse?",
    answer: "A policy lapses when the second premium of the policy is not paid within the grace period provided after the due date. The grace period for yearly, half-yearly, quarterly and monthly payment modes is 31 days."
  },
  {
    question: "17: How can a lapsed policy be revived?",
    answer: "The policy can be revived within 5 years of lapse. The policyholder must submits either a non-medical or medical revival form, depending on the age of the life assured and the sum assured at the time of revival."
  },
  {
    question: "18: Can a policy be altered?",
    answer: "No alteration is permissible in the policy document - the evidence of contract, unless both the parties to the contract agree. After the policy is issued, a policyholder in a number of cases finds the terms not suitable to him or her and desires to change them to suit his or her convenience. State Life also realizes that insurance being a long-term contract, certain changes under given circumstances might necessitate an alteration of the contract. Keeping in view the basic principles of insurance and administrative convenience, State Life permits some alterations. As a rule, State Life will not permit alterations within the 1st year from the commencement of the policy."
  },
  {
    question: "19: What happens if the policy document is lost?",
    answer: "The loss or destruction of a policy document does not absolve the Corporation of its liability to pay the policy benefits when a claim arises. If the policy document is lost or destroyed, the claim or sum insured will be paid to the claimant or policyholder after they provide an indemnity bond jointly with two sureties along with advertisement in newspaper for loss of policy document. Similarly, a policy can be surrendered even if the original policy document is lost. However, for the purposes of obtaining a loan or claiming survival benefits, a duplicate policy must be obtained."
  },
  {
    question: "20: What is the maximum period in which a lapsed policy can be revived?",
    answer: "A lapsed Life Insurance policy can be revived within 5 years from the date of the first unpaid premium."
  },
  {
    question: "21: Can a life insurance policy be sold?",
    answer: "It is not possible to raise money against your life insurance policy. However, there is a provision available by way of assignment or mortgaging the policy provided the policy has been in force for a minimum stipulated period."
  },
  {
    question: "22: What happens when a policy is lost?",
    answer: "In case the policy is lost, policyholder should get a duplicate policy issued. State Life issues it after completion of certain formalities and a nominal fee."
  },
  {
    question: "23: Can a lapsed policy be revived?",
    answer: "A lapsed policy can be revived within five years from the date of the first unpaid premium."
  },
  {
    question: "24: How are premiums on life policies calculated?",
    answer: "The calculation of life insurance premiums is primarily based on four factors age of the person to be insured insured, type of policy, sum insured and term of the policy."
  },
  {
    question: "25: Is life insurance a saving instrument?",
    answer: "Life insurance is mainly considered as a saving instrument rather than an investment avenue as it promotes compulsory savings besides protecting the family of the policyholder in the event of unforeseen happening. It is the only saving instrument, which covers the life risk. A loan can also be availed against the State Life insurance policies."
  },
  {
    question: "26: How is a life insurance policy useful?",
    answer: "A life insurance policy provides several benefits:\n\nFinancial Security: It ensures that your dependents have financial support in the event of your untimely death, helping them cover living expenses, education costs, and other financial needs.\n\nDebt Coverage: It can help pay off any outstanding debts, such as a mortgage, car loans, or personal loans, preventing your family from being burdened with these financial obligations.\n\nSavings and Investment: Certain life insurance policies, such as endowment plans and whole life policies, also serve as a means of saving and investment. They can accumulate cash value over time, which can be borrowed against or withdrawn.\n\nRetirement Planning: Some life insurance policies offer features that can be used as a source of income during retirement, providing additional financial stability."
  },
  {
    question: "27: What loans are available against life insurance policies?",
    answer: "At present loans are granted up to 80% of the Surrender Value for policies, where the premium due is fully paid-up. The rate of profit or return charged is 10% per annum compounded semiannually."
  },
  {
    question: "28: Who is eligible for Policy Loan?",
    answer: "Policyholders are eligible to borrow against their policies subject to certain terms and conditions."
  },
  {
    question: "29: What is the procedure to get a Loan?",
    answer: "The policyholder has to apply for loan in a prescribed form and submit the policy document with the form duly completed."
  },
  {
    question: "30: What is the rate of interest for the policy loan?",
    answer: "Currently, State Life is charging 10% interest on policy loans. Interest is payable half-yearly."
  },
  {
    question: "31: How to repay the loan amount?",
    answer: "A policyholder can repay the loan amount either in part or in full anytime during the term of the policy."
  },
  {
    question: "32: What happens if the loan is not repaid?",
    answer: "If the policyholder fails to repay the loan, the State Life is entitled to recover the loan amount along with the markup from the due final payment."
  },
  {
    question: "33: What is reinsurance?",
    answer: "Reinsurance is a process by which an insurance company (the \"ceding company\") transfers a portion of its risks to another insurance company (the \"reinsurer\"). This is done to manage risk and ensure financial stability."
  },
  {
    question: "34: What is underwriting?",
    answer: "Underwriting is a critical process in the insurance industry where an insurer evaluates the risk exposures of potential clients. Based on this assessment, the insurer decides whether to accept or reject the application for insurance coverage and, if accepted, determines the terms and pricing of the policy."
  },
  {
    question: "35: What is Automatic Non-Forfeiture Options?",
    answer: "State Life Insurance provides the facility to select the Automatic Non-Forfeiture option against the policy. The options are as under \n1. Automatic Paid-up (Option A)\n2. Automatic Premium Loan (Option B)\n\n1. Automatic paid-up Option (Option A) \nThis policy will be converted into a paid-up policy. The paid-up Sum insured will be specially calculated to allow for the clearance of all outstanding dues of State Life against the policy. No further premium (s) will be payable but the sum insured will be reduced.\n\n2. Automatic Premium Loan Option (Option B) \nAs long as the net surrender value of the policy equal to or exceeds any due premium remaining unpaid beyond its grace period, State Life will continue to keep this policy in full force, and treats the premium as paid, by creating an Automatic Premium Loan (APL) against the net surrender value of the policy."
  },
  {
    question: "36: A Automatic paid-up Option",
    answer: "This policy will be converted into a paid-up policy. The paid-up Sum Insured will be specially calculated to allow for the clearance of all outstanding dues of State Life against the policy. No further premium(s) will be payable but the sum insured will be reduced. Any bonuses attached to the policy will be taken into consideration while determining the paid-up sum insured. A policy once paid-up will not be entitled to any further bonuses. If the specially calculated paid-up sum insured works out to be less than Rs.100/ the policy will not be converted into paid-up but will be treated as having been forfeited losing all its benefits. A policy thus made paid-up may be revived for full sum insured as per provision of condition No-4 above."
  },
  {
    question: "37: B  Automatic Premium Loan Option",
    answer: "So long as the net surrender value of the policy equals or exceeds any due premium remaining unpaid beyond its grace period, State Life will continue to keep this policy in full force, and treat the said premium as paid by creating an automatic premium loan against the net surrender value of the policy. When the net surrender value of the policy becomes less than a due premium remaining unpaid beyond its grace period, the policy will be kept in full force for a further broken period. This broken period will bear the same proportion to the full period of the unpaid premium as the net surrender value bears to the unpaid premium. The policy; will automatically be forfeited and lose all benefits at the expiry of the said broken period. Profit or return (however called or described) will be charged on automatic premium loan at rates determined by State Life from time to time, so long as any automatic premium loan along with profit or return (However called or described) is outstanding against this policy, any; payment received by State Life will first be applied to reduce this debt."
  },
  {
    question: "38: Why do I need life insurance?",
    answer: "Life insurance provides financial protection for your loved ones in the event of your death. It can cover funeral expenses, replace lost income, pay off debts, and help maintain your family's standard of living"
  },
  {
    question: "39: What is our Non Declinature (ND) Scheme?",
    answer: "SLIC, is having the Non-Declaration (ND) Scheme, where the policy can be provided to the individual having any medical condition, but the main point in this scheme is that the death claim is not payable till the policy is completed 02 year from the date of commencement. Many prospective policy holders apply for the coverage under this scheme after getting postponed or decline from our underwriters, but the policy holder can apply for the coverage under this scheme with disclosing or refusing for any medical examination."
  },
  {
    question: "40: What is occupational extra?",
    answer: "If anyone applying for the life coverage associated with the occupation, which has chances of life endanger, to provide such coverage occupation extra is being charge, along with the life premium."
  },
  {
    question: "41: Why extra mortality is charged?",
    answer: "Underwriter, while underwriting, evaluates the medical condition of the life which is proposed to be covered, if the individual is suffering from any kind of issues, and the underwriter thinks that the life can be covered by charging extra mortality, they charge the premium extra than the normal. For implementation extra premium the consent form needs to get signed from the policy holder."
  },
  {
    question: "42: What are the various modes of payment of premium?",
    answer: "Premiums other than single premiums policy can be paid by the policyholders to State Life in yearly, half-yearly, quarterly or monthly installments."
  },
  {
    question: "43: How one can update the Address, and contact details?",
    answer: "For the updating of the Address and contact details, the policy holder provides the written request along with the Valid CNIC, the contact details will be updated as soon as the request would be available to concerned zone, from which the policy is issued. It will also activate the SMS alert which the SLIC provide to their policy holders on different events."
  },
  {
    question: "44: What is the procedure to transfer the policy from one zone to another?",
    answer: "To transfer the policy from one zone to another, the policy holder has to provide the written request along with Valid CNIC. For transfer of policy the policy must have run for at least 2 years and it does not contain any dues premiums or loan. On receiving the request the letter would be written to the zone where the policy holder wishes to get transferred. On receiving the NOC from the concerned zone the policy will be transferred as per request of the policy holder."
  },
  {
    question: "45: How we can deposit premium without visiting the zone?",
    answer: "The SLIC is providing the service of premium and loan payments without visiting to the zone. The policy holder can pay the premiums or loan amount by visiting our official website i.e. www.statelife.com.pk, or visiting any nearest branch of Bank Al-Falah, they can also fulfill their financial obligation through our Jazz Cash account."
  },
  {
    question: "46: What is the procedure for making any alteration of plan, Sum Assured, Mode?",
    answer: "For such alteration the policy holder have to provide the written request with original documents, along with their valid CNIC, need to submit the alteration fees. The Policy Holder services department of concerned zone will entertain the request as provided."
  },
  {
    question: "47: How to apply for duplicate documents in an event of loss of documents?",
    answer: "In an event of original policy documents lost, one should provide information to the SLIC PHS department, and can request for duplicate of same. For this purpose the affidavit, will be made. Advertisement will be given in newspaper, the policyholder needs to pay for policy stamp and alteration fees of RS. 25/- and one completion of a month period, the policy holder department provide the duplicate documents as requested."
  },
  {
    question: "48: What one need to do for applying for surrender or loan?",
    answer: "If the policy holder wishes to exercise his/her right to surrender or take loan from the policy, then he/she needs to visit the zonal office of the SLIC. For surrender the surrender request form along with discharge voucher for bank account verification by the bank will be provided to the policy holder. On completion of the requirement the policy holder gets the surrender cash value, in his/her verified bank account. And in case of loan the 80% of the cash value will be credited to the bank account provided by the policy holder."
  },
  {
    question: "49: What is the procedure and what documents are required for the process of maturity?",
    answer: "The SLIC provides our each and every policy holder, a good newsletter a month before maturity, so they can get reminded about their maturity. The policy holder have to submit the good newsletter with the information of their bank details, where the maturity claim is to be paid, along with their valid CNIC, original documents, and Zakat Declaration (CZ-50), if they wish not to deduct their zakat. The CZ-50 must be a month older than their date of maturity."
  },
  {
    question: "50: How to claim for death of the policy holder?",
    answer: "For the death claim, the family member of the assured needs to provide the death intimation, along with copy of valid CNIC, and copy of death certificate. On receiving of the intimation the PHS claim department within 07 days will dispatch the claim forms to the nominee."
  },
  {
    question: "51: How many type of death claims form are?",
    answer: "We are having 04 type of claims form Claim form A, B, C and D. \n\nClaim form A is known as Claimant Statement, where the claimant provides the information of him/herself and about the life assured.\n\nClaim form B: is the Medical Attendant Certificate, it needs to be filled by the doctor, who treated the assured.\n\nClaim form C: Assured Identity this form is filled by the individual who knows the assured and can identify him/her and also provided the details of the assured like physical appearance etc.\n\nClaim form D: Employers certificate, it needs to filled by the company where the assured was working.\n\nAll the above forms must be attested by the Gazette officer, or the Area Manager of SLIC or any officer of SLIC can also attested the form and the copy of CNIC of the individual filling claim form A, and C also required."
  },
  {
    question: "52: How we can appoint minor as nominee?",
    answer: "The individual can appoint minor as nominee, for that the assured have to appoint the guardian for the nominee, who can act in the favor of the nominee, in an event of death. As soon as the minor attaints the age of 18 the guardianship automatically dissolves."
  },
  {
    question: "53: When my children are minor can I buy insurance for them?",
    answer: "Yes, if the children are minor, the insurance can be brought to cover their life. For applying the coverage parents lives must be covered from State Life Insurance, and the coverage will be equal to the half of the parents life covered."
  },
  {
    question: "54: When and how can I cancel my policy?",
    answer: "For the cancellation of the policy governed under clause no. 17 of the conditions and privileges of SLIC. Accordance to it the policy holder has the right to apply for the cancellation of the policy within 14 days of the issuance. To exercise the right the policy holder needs to visit the New Business Department (NBD) of concerned zone, and provide the written request along with valid CNIC and original documents, and also needs to fill the refund of premium form, containing the requirement of bank details. The amount which the policy holder submitted at the time of applying of policy gets refunds after deduction of administrative expenses plus medical expenses (if medical examination is conducted)."
  }
];

  // Filter questions based on search term
  const filteredQuestions = faqData.filter(item => 
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <Box 
      sx={{ 
        maxWidth: 800, 
        margin: '0 auto', 
        padding: { xs: 2, sm: 3 },
        minHeight: '100vh'
      }}
    >
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mb: 3,
            color: '#007ACC'
          }}
        >
          <ContactSupport sx={{ fontSize: 40, mr: 2 }} />
          <Typography 
            variant="h3" 
            component="h1"
            sx={{ 
              fontWeight: 700,
              background: 'linear-gradient(to right, #007ACC, #00B4DB)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Help Center
          </Typography>
        </Box>
        
        <Typography 
          variant="subtitle1" 
          sx={{ mb: 3, color: 'text.secondary' }}
        >
          Find answers to common questions about our insurance policies and services
        </Typography>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Paper 
          elevation={3}
          sx={{ 
            mb: 4,
            borderRadius: 3,
            overflow: 'hidden',
            border: '1px solid rgba(0, 122, 204, 0.2)'
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search questions or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: '#007ACC' }} />
                </InputAdornment>
              ),
              sx: {
                padding: 1.5,
                '& input': {
                  padding: '8px 0'
                }
              }
            }}
            sx={{
              '& fieldset': { border: 'none' }
            }}
          />
        </Paper>
      </motion.div>

      {/* Results Count */}
      {searchTerm && (
        <Fade in={true}>
          <Typography 
            variant="body2" 
            sx={{ 
              mb: 2, 
              color: 'text.secondary',
              fontStyle: 'italic'
            }}
          >
            Found {filteredQuestions.length} {filteredQuestions.length === 1 ? 'result' : 'results'}
          </Typography>
        </Fade>
      )}

      <Divider sx={{ my: 2, borderColor: 'rgba(0, 122, 204, 0.1)' }} />

      {/* FAQ List */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.005 }}
            >
              <Accordion 
                expanded={expanded === `panel${index}`} 
                onChange={handleChange(`panel${index}`)}
                sx={{ 
                  mb: 2,
                  borderRadius: '12px !important',
                  overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(0, 122, 204, 0.08)',
                  transition: 'all 0.3s ease',
                  '&:before': {
                    display: 'none'
                  },
                  '&.Mui-expanded': {
                    margin: '16px 0',
                    backgroundColor: 'rgba(0, 122, 204, 0.03)'
                  }
                }}
              >
                <AccordionSummary
                  expandIcon={
                    <Zoom in={true}>
                      <ExpandMore sx={{ color: '#007ACC' }} />
                    </Zoom>
                  }
                  sx={{
                    minHeight: 68,
                    '&.Mui-expanded': {
                      minHeight: 68,
                      borderBottom: '1px solid rgba(0, 122, 204, 0.1)'
                    },
                    '& .MuiAccordionSummary-content': {
                      alignItems: 'center',
                      margin: '12px 0'
                    }
                  }}
                >
                  <HelpOutline 
                    sx={{ 
                      color: '#007ACC', 
                      mr: 2,
                      fontSize: 24
                    }} 
                  />
                  <Typography 
                    variant="subtitle1" 
                    sx={{ 
                      fontWeight: 600,
                      color: expanded === `panel${index}` ? '#007ACC' : 'text.primary'
                    }}
                  >
                    {item.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{ 
                    padding: 3,
                    backgroundColor: 'rgba(0, 122, 204, 0.02)'
                  }}
                >
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      lineHeight: 1.7,
                      color: 'text.secondary',
                      whiteSpace: 'pre-line'
                    }}
                  >
                    {item.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </motion.div>
          ))
        ) : (
          <Grow in={true}>
            <Box 
              sx={{ 
                textAlign: 'center', 
                p: 4,
                backgroundColor: 'rgba(0, 122, 204, 0.03)',
                borderRadius: 3
              }}
            >
              <Search sx={{ fontSize: 60, color: 'rgba(0, 122, 204, 0.3)', mb: 2 }} />
              <Typography variant="h6" sx={{ mb: 1 }}>
                No results found
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                Try different keywords or browse the categories
              </Typography>
            </Box>
          </Grow>
        )}
      </motion.div>

      {/* Contact CTA */}
      <Fade in={true} style={{ transitionDelay: '300ms' }}>
        <Paper
          elevation={0}
          sx={{
            mt: 4,
            p: 3,
            borderRadius: 3,
            backgroundColor: 'rgba(0, 122, 204, 0.05)',
            border: '1px solid rgba(0, 122, 204, 0.1)',
            textAlign: 'center'
          }}
        >
          <Typography variant="h6" sx={{ mb: 1, color: '#007ACC' }}>
            Still have questions?
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
            Our support team is here to help you
          </Typography>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            style={{
              backgroundColor: '#007ACC',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: 30,
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '1rem',
              boxShadow: '0 4px 15px rgba(0, 122, 204, 0.3)'
            }}
          >
            Contact Support
          </motion.button>
        </Paper>
      </Fade>
    </Box>
  );
};

export default FAQs;