const tools = [
  // --- FINANCE ---
  {
    name: 'Salary Calculator',
    slug: 'salary-calculator',
    description: 'Calculate your take-home salary after tax and deductions. Free salary calculator for Indian CTC breakdown.',
    category: 'Finance', icon: 'DollarSign',
    keywords: ['salary calculator', 'take home salary', 'CTC calculator', 'in-hand salary', 'salary breakup'],
    faq: [
      { q: 'How is take-home salary calculated?', a: 'Take-home salary = CTC - (PF + Professional Tax + Income Tax). Our calculator handles all deductions automatically.' },
      { q: 'What is the difference between CTC and take-home salary?', a: 'CTC includes employer contributions, gratuity, and other benefits. Take-home is what you actually receive after all deductions.' },
    ],
    componentPath: 'salary-calculator',
    content: {
      longDescription: 'Our Salary Calculator helps you instantly calculate your take-home salary from your CTC (Cost to Company). Whether you are a salaried employee in India trying to understand your payslip or a job seeker evaluating an offer, this free online tool provides a detailed CTC breakup. It computes basic pay, HRA, PF deductions, professional tax, and income tax under the new tax regime. The calculator gives you both monthly take-home and annual in-hand salary figures. Understanding your salary structure helps with financial planning, tax saving, and negotiating better offers. Use our salary breakup calculator to see exactly where your money goes each month.',
      howItWorks: [
        { step: '1', title: 'Enter Your CTC', desc: 'Type your annual Cost to Company in the input field' },
        { step: '2', title: 'Adjust with Slider', desc: 'Use the slider to quickly try different salary ranges' },
        { step: '3', title: 'View Full Breakup', desc: 'See monthly take-home, PF, tax, and complete salary breakdown' },
      ],
      benefits: [
        { title: 'Know Your Exact Take-Home', desc: 'No more guessing. See exactly how much lands in your bank each month' },
        { title: 'Understand Deductions', desc: 'Transparent view of PF, professional tax, and income tax deducted' },
        { title: 'Compare Job Offers', desc: 'Evaluate multiple CTC offers by comparing take-home figures side by side' },
        { title: 'Tax Planning', desc: 'Plan your investments better by understanding your tax liability upfront' },
      ],
    },
  },
  {
    name: 'EMI Calculator',
    slug: 'emi-calculator',
    description: 'Calculate monthly EMI for home loan, car loan, or personal loan with amortization schedule.',
    category: 'Finance', icon: 'Calculator',
    keywords: ['EMI calculator', 'loan calculator', 'home loan EMI', 'car loan EMI', 'personal loan'],
    faq: [
      { q: 'How is EMI calculated?', a: 'EMI = [P x R x (1+R)^N] / [(1+R)^N - 1] where P = Principal, R = Monthly Interest Rate, N = Number of Months.' },
      { q: 'What is an amortization schedule?', a: 'It shows the breakup of each payment into principal and interest over the loan tenure.' },
    ],
    componentPath: 'emi-calculator',
    content: {
      longDescription: 'Use our free EMI Calculator to compute your monthly loan installments quickly and accurately. Whether you are planning a home loan, car loan, education loan, or personal loan, this tool helps you estimate your EMI before you apply. Simply enter the loan amount, interest rate, and tenure to get your monthly payment along with the total interest payable and full amortization schedule. Understanding your EMI helps you budget better and choose the right loan tenure. Plan your finances wisely with our easy-to-use loan calculator.',
      howItWorks: [
        { step: '1', title: 'Enter Loan Details', desc: 'Input loan amount, interest rate, and repayment tenure' },
        { step: '2', title: 'Click Calculate', desc: 'Our calculator instantly processes the EMI formula' },
        { step: '3', title: 'Review Results', desc: 'View your monthly EMI, total interest, and total payment' },
      ],
      benefits: [
        { title: 'Plan Your Budget', desc: 'Know your monthly obligation before taking any loan' },
        { title: 'Compare Loan Options', desc: 'Test different tenures and rates to find the best deal' },
        { title: 'See Total Interest', desc: 'Understand the true cost of borrowing with total interest payable' },
        { title: 'Quick & Free', desc: 'No sign-ups, no limits. Calculate as many scenarios as you need' },
      ],
    },
  },
  {
    name: 'GST Calculator',
    slug: 'gst-calculator',
    description: 'Calculate GST amounts and inclusive/exclusive prices. Supports all GST rates.',
    category: 'Finance', icon: 'Receipt',
    keywords: ['GST calculator', 'GST calculation', 'tax calculator', 'GST inclusive', 'GST exclusive'],
    faq: [
      { q: 'What is GST?', a: 'GST (Goods and Services Tax) is a consumption tax on goods and services. In India, it ranges from 0% to 28%.' },
      { q: 'How do I calculate GST?', a: 'GST Amount = Original Price x GST Rate / 100. Final Price = Original Price + GST Amount.' },
    ],
    componentPath: 'gst-calculator',
    content: {
      longDescription: 'Calculate GST effortlessly with our free online GST calculator. Whether you are a business owner, freelancer, or consumer, this tool helps you compute GST amounts for any transaction. Supports all GST rates including 0%, 5%, 12%, 18%, and 28%. You can calculate GST both exclusively (adding GST to base price) and inclusively (extracting GST from total price). Perfect for invoicing, tax filing, and price comparison. Get accurate GST calculations instantly without any complex formulas.',
      howItWorks: [
        { step: '1', title: 'Enter Amount', desc: 'Type the base amount or total amount depending on your calculation type' },
        { step: '2', title: 'Select GST Rate', desc: 'Choose from 0%, 5%, 12%, 18%, or 28% GST rates' },
        { step: '3', title: 'Choose Mode', desc: 'Toggle between exclusive (add GST) or inclusive (extract GST) calculation' },
      ],
      benefits: [
        { title: 'All GST Rates Supported', desc: 'Covers all standard GST slabs from 0% to 28%' },
        { title: 'Dual Mode Calculation', desc: 'Calculate GST both exclusively and inclusively' },
        { title: 'Business Ready', desc: 'Perfect for invoices, quotations, and tax filing' },
        { title: 'Zero Cost', desc: 'Completely free with unlimited calculations' },
      ],
    },
  },
  {
    name: 'FD Calculator',
    slug: 'fd-calculator',
    description: 'Calculate fixed deposit maturity amount and interest earnings with quarterly compounding.',
    category: 'Finance', icon: 'Landmark',
    keywords: ['FD calculator', 'fixed deposit calculator', 'FD maturity calculator', 'fixed deposit interest'],
    faq: [
      { q: 'How is FD interest calculated?', a: 'Maturity = P x (1 + r/n)^(nt) where P = Principal, r = Rate, n = Compounding frequency, t = Time.' },
      { q: 'What is quarterly compounding?', a: 'Interest is calculated and added to the principal every quarter, leading to higher returns.' },
    ],
    componentPath: 'fd-calculator',
    content: {
      longDescription: 'Plan your fixed deposit investments with our accurate FD calculator. Enter your deposit amount, interest rate, and tenure to instantly know the maturity amount and total interest earned. The calculator uses quarterly compounding which is the standard for most bank FDs in India. Visualize how your money grows over time and compare different tenures and rates to maximize your returns. Whether you are investing for 1 year or 5 years, our FD maturity calculator gives you precise figures to make informed investment decisions.',
      howItWorks: [
        { step: '1', title: 'Enter Deposit Amount', desc: 'Type the principal amount you want to invest' },
        { step: '2', title: 'Set Rate & Tenure', desc: 'Enter the interest rate and investment period in years' },
        { step: '3', title: 'Get Maturity Value', desc: 'View total maturity amount, interest earned, and effective yield' },
      ],
      benefits: [
        { title: 'Quarterly Compounding', desc: 'Calculates using standard bank FD compounding frequency' },
        { title: 'See Effective Yield', desc: 'Know your actual annual return with compounding effect' },
        { title: 'Compare Investments', desc: 'Test different tenures to find the best returns' },
        { title: 'No Sign-ups', desc: 'Free to use with unlimited calculations' },
      ],
    },
  },
  {
    name: 'SIP Calculator',
    slug: 'sip-calculator',
    description: 'Calculate your mutual fund SIP returns with step-up option. Plan your investment goals.',
    category: 'Finance', icon: 'TrendingUp',
    keywords: ['SIP calculator', 'mutual fund calculator', 'SIP return calculator', 'investment calculator'],
    faq: [
      { q: 'What is SIP?', a: 'Systematic Investment Plan lets you invest a fixed amount regularly in mutual funds.' },
      { q: 'How are SIP returns calculated?', a: 'Using the future value of annuity formula considering monthly investments and expected returns.' },
    ],
    componentPath: 'sip-calculator',
    content: {
      longDescription: 'Plan your mutual fund investments with our free SIP calculator. Whether you are saving for retirement, your child education, or a dream vacation, this tool shows how your monthly investments can grow over time. Enter your monthly investment amount, expected return rate, and tenure to see the maturity amount. You can also add an annual step-up to see how increasing your investment each year boosts your corpus. Make data-driven investment decisions with our easy-to-use mutual fund SIP return calculator.',
      howItWorks: [
        { step: '1', title: 'Monthly Investment', desc: 'Enter the amount you plan to invest every month' },
        { step: '2', title: 'Expected Returns', desc: 'Set your expected annual return rate and investment tenure' },
        { step: '3', title: 'Add Step-Up', desc: 'Optionally add annual increase percentage for realistic planning' },
      ],
      benefits: [
        { title: 'See Future Corpus', desc: 'Know exactly how much your SIP will grow to at maturity' },
        { title: 'Step-Up Feature', desc: 'Plan realistic investments that increase with your income' },
        { title: 'Goal Planning', desc: 'Work backwards from your financial goals to set SIP amounts' },
        { title: 'Risk-Free Planning', desc: 'Test different scenarios without any actual investment' },
      ],
    },
  },

  // --- AI ---
  {
    name: 'Resume Checker',
    slug: 'resume-checker',
    description: 'AI-powered resume checker that analyzes your resume and provides actionable improvements.',
    category: 'AI', icon: 'FileSearch',
    keywords: ['resume checker', 'resume analyzer', 'AI resume', 'resume review', 'resume feedback'],
    faq: [
      { q: 'How does the AI resume checker work?', a: 'Our AI analyzes your resume against industry standards and best practices, providing detailed feedback.' },
    ],
    componentPath: 'resume-checker', requiresAI: true,
    content: {
      longDescription: 'Get your resume reviewed by AI in seconds. Our Resume Checker analyzes your resume content against industry best practices and provides detailed, actionable feedback. It evaluates structure, content quality, keyword usage, formatting, and overall impact. Whether you are a fresh graduate or an experienced professional, get personalized suggestions to make your resume stand out to recruiters. Improve your chances of landing interviews with our free AI-powered resume analysis tool.',
      howItWorks: [
        { step: '1', title: 'Upload Resume', desc: 'Upload your PDF or DOCX resume file' },
        { step: '2', title: 'AI Analysis', desc: 'Our AI reviews content, structure, and keyword optimization' },
        { step: '3', title: 'Get Feedback', desc: 'Receive detailed suggestions to improve your resume' },
      ],
      benefits: [
        { title: 'Instant AI Review', desc: 'Get professional-level feedback in seconds, not days' },
        { title: 'Actionable Suggestions', desc: 'Specific recommendations you can implement immediately' },
        { title: 'Industry Standards', desc: 'Analysis based on current hiring best practices' },
        { title: 'Completely Free', desc: 'No hidden charges or credit card required' },
      ],
    },
  },
  {
    name: 'ATS Resume Score',
    slug: 'ats-resume-score',
    description: 'Check your resume ATS score and optimize it for Applicant Tracking Systems.',
    category: 'AI', icon: 'ScrollText',
    keywords: ['ATS resume score', 'ATS checker', 'resume ATS', 'applicant tracking system', 'resume optimization'],
    faq: [
      { q: 'What is an ATS?', a: 'Applicant Tracking Systems are software used by employers to filter resumes before human review.' },
    ],
    componentPath: 'ats-resume-score', requiresAI: true,
    content: {
      longDescription: 'Most large companies use Applicant Tracking Systems (ATS) to filter resumes before they reach human eyes. Our ATS Resume Score tool analyzes your resume against ATS algorithms and gives you a score out of 100. It checks keyword relevance, formatting compatibility, section headers, file type, and content density. With over 75% of resumes rejected by ATS systems, optimizing your resume is crucial. Use our ATS checker to ensure your resume passes the automated screening and reaches actual recruiters.',
      howItWorks: [
        { step: '1', title: 'Upload Resume', desc: 'Upload your resume file for ATS analysis' },
        { step: '2', title: 'Add Job Description', desc: 'Optionally paste the target job description for keyword matching' },
        { step: '3', title: 'Get ATS Score', desc: 'See your ATS compatibility score and optimization tips' },
      ],
      benefits: [
        { title: 'ATS Compatibility Check', desc: 'Know if your resume format works with ATS systems' },
        { title: 'Keyword Optimization', desc: 'Match your resume keywords to target job descriptions' },
        { title: 'Format Analysis', desc: 'Check if your formatting choices hurt your ATS score' },
        { title: 'Beat the Robots', desc: 'Optimize your resume to pass automated screening' },
      ],
    },
  },
  {
    name: 'Cover Letter Generator',
    slug: 'cover-letter-generator',
    description: 'Generate professional cover letters tailored to any job description using AI.',
    category: 'AI', icon: 'PenLine',
    keywords: ['cover letter generator', 'AI cover letter', 'cover letter writer', 'job application letter'],
    faq: [
      { q: 'How does the cover letter generator work?', a: 'Enter the job description and your details. Our AI creates a tailored cover letter.' },
    ],
    componentPath: 'cover-letter-generator', requiresAI: true,
    content: {
      longDescription: 'Write professional, tailored cover letters in seconds with our AI-powered Cover Letter Generator. Simply provide the job title, company name, and your key skills, and our AI crafts a compelling cover letter that highlights your qualifications. A great cover letter can significantly increase your chances of getting an interview. Our generator creates personalized letters that follow professional standards while showcasing your unique strengths. Save time and make a strong impression with every job application.',
      howItWorks: [
        { step: '1', title: 'Enter Details', desc: 'Provide job title, company name, and your key skills' },
        { step: '2', title: 'AI Generates Letter', desc: 'Our AI creates a tailored, professional cover letter' },
        { step: '3', title: 'Copy & Use', desc: 'Copy the generated letter and customize as needed' },
      ],
      benefits: [
        { title: 'Save Hours', desc: 'Generate a professional cover letter in under 30 seconds' },
        { title: 'Tailored Content', desc: 'Each letter is customized to the specific job and company' },
        { title: 'Professional Format', desc: 'Follows standard cover letter structure and tone' },
        { title: 'Free & Unlimited', desc: 'Generate unlimited cover letters at no cost' },
      ],
    },
  },
  {
    name: 'Grammar Checker',
    slug: 'grammar-checker',
    description: 'AI-powered grammar and spell checker. Fix errors and improve your writing instantly.',
    category: 'AI', icon: 'SpellCheck2',
    keywords: ['grammar checker', 'spell checker', 'AI grammar check', 'writing assistant', 'proofreading'],
    faq: [
      { q: 'Is the grammar checker free?', a: 'Yes, completely free. No word limits, no sign-ups required.' },
    ],
    componentPath: 'grammar-checker', requiresAI: true,
    content: {
      longDescription: 'Improve your writing with our free AI-powered Grammar Checker. Whether you are writing an email, essay, blog post, or business document, our tool catches grammar errors, spelling mistakes, punctuation issues, and style improvements. Paste your text and get a detailed analysis with corrections and explanations. Unlike basic spell checkers, our AI understands context and catches subtle grammar issues that other tools miss. Write with confidence knowing your text is error-free and professionally polished.',
      howItWorks: [
        { step: '1', title: 'Paste Text', desc: 'Copy and paste your content into the text area' },
        { step: '2', title: 'AI Analysis', desc: 'Our AI scans for grammar, spelling, and style issues' },
        { step: '3', title: 'Get Corrections', desc: 'Review errors and copy the corrected version' },
      ],
      benefits: [
        { title: 'Context-Aware AI', desc: 'Understands context to catch subtle grammar mistakes' },
        { title: 'No Word Limits', desc: 'Check documents of any length without restrictions' },
        { title: 'Style Improvements', desc: 'Get suggestions to make your writing clearer and more professional' },
        { title: '100% Free', desc: 'No premium tiers, no sign-ups, completely free to use' },
      ],
    },
  },
  {
    name: 'AI Prompt Generator',
    slug: 'ai-prompt-generator',
    description: 'Generate powerful AI prompts for ChatGPT, Midjourney, DALL-E, and more.',
    category: 'AI', icon: 'Sparkles',
    keywords: ['AI prompt generator', 'prompt engineering', 'ChatGPT prompts', 'Midjourney prompts', 'prompt ideas'],
    faq: [
      { q: 'What types of prompts can I generate?', a: 'Our AI generates prompts for text, image, code, and creative AI tools.' },
    ],
    componentPath: 'ai-prompt-generator', requiresAI: true,
    content: {
      longDescription: 'Unlock the full potential of AI tools with expertly crafted prompts. Our AI Prompt Generator creates optimized prompts for ChatGPT, Claude, Midjourney, DALL-E, Stable Diffusion, GitHub Copilot, and more. Good prompts are the key to getting quality AI outputs. Whether you need prompts for content writing, image generation, coding, or creative projects, our generator produces detailed, specific prompts that deliver results. Save hours of prompt engineering and get better AI outputs instantly.',
      howItWorks: [
        { step: '1', title: 'Choose Type', desc: 'Select from text, image, code, or creative prompt categories' },
        { step: '2', title: 'Describe Topic', desc: 'Tell us what you want prompts about' },
        { step: '3', title: 'Get Prompts', desc: 'Receive 5 optimized prompts ready to use with any AI tool' },
      ],
      benefits: [
        { title: 'Multi-Tool Support', desc: 'Prompts optimized for ChatGPT, Midjourney, Copilot, and more' },
        { title: 'Save Time', desc: 'Skip prompt engineering with ready-to-use expert prompts' },
        { title: 'Better Results', desc: 'Detailed, specific prompts that produce higher quality AI outputs' },
        { title: 'All Categories', desc: 'Generate prompts for text, image, code, and creative needs' },
      ],
    },
  },

  // --- PDF ---
  {
    name: 'PDF to Excel',
    slug: 'pdf-to-excel',
    description: 'Convert PDF tables to Excel spreadsheets online free. Fast and accurate PDF to XLS conversion.',
    category: 'PDF', icon: 'FileSpreadsheet',
    keywords: ['PDF to Excel', 'convert PDF to Excel', 'PDF to XLS', 'PDF to spreadsheet', 'extract PDF table'],
    faq: [
      { q: 'Is PDF to Excel free?', a: 'Yes, our PDF to Excel converter is completely free with no file size limits.' },
    ],
    componentPath: 'pdf-to-excel',
    content: {
      longDescription: 'Convert your PDF files to Excel spreadsheets quickly and easily with our free online tool. Whether you need to extract tables from financial reports, invoices, or data sheets, our PDF to Excel converter preserves your data structure. No installation required, no file upload limits. All processing happens in your browser for maximum privacy. Perfect for accountants, analysts, and professionals who need to work with PDF data in spreadsheet format.',
      howItWorks: [
        { step: '1', title: 'Upload PDF', desc: 'Select the PDF file containing tables or data' },
        { step: '2', title: 'Click Convert', desc: 'Our tool processes your file and extracts tabular data' },
        { step: '3', title: 'Download CSV', desc: 'Get your data in CSV format ready for Excel' },
      ],
      benefits: [
        { title: 'No File Size Limits', desc: 'Convert PDFs of any size without restrictions' },
        { title: 'Privacy First', desc: 'All processing happens in your browser, files never leave your device' },
        { title: 'Fast Conversion', desc: 'Get your spreadsheet in seconds, not minutes' },
        { title: 'Completely Free', desc: 'No hidden charges, no premium tiers, no sign-ups' },
      ],
    },
  },
  {
    name: 'PDF to Word',
    slug: 'pdf-to-word',
    description: 'Convert PDF files to editable Word documents online free. High-quality PDF to DOCX conversion.',
    category: 'PDF', icon: 'FileType',
    keywords: ['PDF to Word', 'convert PDF to Word', 'PDF to DOCX', 'edit PDF', 'PDF converter'],
    faq: [
      { q: 'How accurate is the conversion?', a: 'Our converter preserves formatting, images, and layout with high accuracy.' },
    ],
    componentPath: 'pdf-to-word',
    content: {
      longDescription: 'Need to edit a PDF but don\'t have the source file? Our free PDF to Word converter lets you transform any PDF into an editable Word document. Perfect for editing contracts, resumes, reports, and forms. The conversion preserves text, images, and basic formatting so you can start editing immediately. No software installation required, and your files are processed securely in your browser.',
      howItWorks: [
        { step: '1', title: 'Upload PDF', desc: 'Choose the PDF file you want to convert' },
        { step: '2', title: 'Convert', desc: 'Click convert and our tool processes your document' },
        { step: '3', title: 'Download DOC', desc: 'Get your editable Word document instantly' },
      ],
      benefits: [
        { title: 'Editable Output', desc: 'Get a fully editable Word document from your PDF' },
        { title: 'Format Preserved', desc: 'Text, images, and layout are maintained' },
        { title: 'Browser Based', desc: 'No software to install, works on any device' },
        { title: 'Free & Fast', desc: 'Convert unlimited PDFs without any cost' },
      ],
    },
  },
  {
    name: 'Merge PDF',
    slug: 'merge-pdf',
    description: 'Combine multiple PDF files into one PDF online free. Merge PDF pages easily.',
    category: 'PDF', icon: 'Combine',
    keywords: ['merge PDF', 'combine PDF', 'join PDF', 'PDF merger', 'merge PDF files'],
    faq: [
      { q: 'How many files can I merge?', a: 'You can merge up to 10 PDF files at once, with a total of 100MB.' },
    ],
    componentPath: 'merge-pdf',
    content: {
      longDescription: 'Combine multiple PDF files into a single document with our free Merge PDF tool. Whether you need to merge scanned documents, combine chapters, or consolidate reports, our tool handles it seamlessly. Upload up to 10 PDF files and merge them in the order you choose. All processing happens client-side, ensuring your documents remain private and secure. Perfect for students, professionals, and anyone working with multiple PDF documents.',
      howItWorks: [
        { step: '1', title: 'Upload PDFs', desc: 'Select multiple PDF files to merge (up to 10)' },
        { step: '2', title: 'Arrange Order', desc: 'Review and manage the order of your files' },
        { step: '3', title: 'Merge & Download', desc: 'Combine all files into one PDF and download' },
      ],
      benefits: [
        { title: 'Merge Up to 10 Files', desc: 'Combine multiple documents into one PDF' },
        { title: 'Client-Side Processing', desc: 'Your files never leave your browser for maximum privacy' },
        { title: 'Preserves Quality', desc: 'Original quality maintained in merged output' },
        { title: '100% Free', desc: 'No limits, no sign-ups, completely free to use' },
      ],
    },
  },
  {
    name: 'Compress PDF',
    slug: 'compress-pdf',
    description: 'Compress PDF files online free. Reduce PDF file size without losing quality.',
    category: 'PDF', icon: 'FileDown',
    keywords: ['compress PDF', 'reduce PDF size', 'PDF compressor', 'compress PDF online', 'smaller PDF'],
    faq: [
      { q: 'How much can I compress?', a: 'Our tool reduces PDF size by up to 80% while maintaining quality.' },
    ],
    componentPath: 'compress-pdf',
    content: {
      longDescription: 'Reduce your PDF file size without sacrificing quality using our free Compress PDF tool. Large PDF files are difficult to email, upload, or share. Our compressor optimizes your PDF to make it smaller while preserving text clarity and image quality. Perfect for reducing scanned documents, presentations, and reports before sharing. No file size limits, no sign-ups required, and all processing happens securely in your browser.',
      howItWorks: [
        { step: '1', title: 'Upload PDF', desc: 'Select the PDF file you want to compress' },
        { step: '2', title: 'Adjust Quality', desc: 'Use the slider to control compression level' },
        { step: '3', title: 'Download', desc: 'Get your compressed PDF with reduced file size' },
      ],
      benefits: [
        { title: 'Up to 80% Reduction', desc: 'Significantly reduce file size while maintaining quality' },
        { title: 'Adjustable Quality', desc: 'Fine-tune compression level with an easy slider' },
        { title: 'Email Ready', desc: 'Compress PDFs to fit email attachment limits' },
        { title: 'Secure Processing', desc: 'Files processed client-side, never uploaded to servers' },
      ],
    },
  },
  {
    name: 'OCR Image to Text',
    slug: 'ocr-image-to-text',
    description: 'Extract text from images and scanned documents using AI-powered OCR. Free online.',
    category: 'PDF', icon: 'ScanText',
    keywords: ['OCR', 'image to text', 'OCR image', 'extract text from image', 'image text extractor'],
    faq: [
      { q: 'What is OCR?', a: 'Optical Character Recognition extracts text from images and scanned documents.' },
    ],
    componentPath: 'ocr-image-text', requiresAI: true,
    content: {
      longDescription: 'Extract text from images, screenshots, and scanned documents using our AI-powered OCR tool. Simply upload an image containing text, and our AI recognizes and extracts every character with high accuracy. Perfect for digitizing printed documents, extracting text from screenshots, copying text from images, and converting physical documents to editable digital text. No more manual typing — let our OCR do the work.',
      howItWorks: [
        { step: '1', title: 'Upload Image', desc: 'Upload a JPG, PNG, or WEBP image containing text' },
        { step: '2', title: 'AI OCR Processing', desc: 'Our AI analyzes the image and extracts all text' },
        { step: '3', title: 'Copy Text', desc: 'Copy the extracted text for use in any application' },
      ],
      benefits: [
        { title: 'High Accuracy', desc: 'AI-powered OCR with excellent text recognition accuracy' },
        { title: 'Multiple Formats', desc: 'Supports JPG, PNG, WEBP, and other common image formats' },
        { title: 'Preserves Structure', desc: 'Maintains layout and paragraph structure where possible' },
        { title: 'Eliminates Typing', desc: 'No more manual data entry from printed documents' },
      ],
    },
  },

  // --- DEVELOPER ---
  {
    name: 'JSON Formatter',
    slug: 'json-formatter',
    description: 'Format, validate, and beautify JSON online. Free JSON formatter with tree view.',
    category: 'Developer', icon: 'Braces',
    keywords: ['JSON formatter', 'beautify JSON', 'JSON validator', 'format JSON', 'JSON prettier'],
    faq: [
      { q: 'Is my data secure?', a: 'All processing happens in your browser. No data is sent to any server.' },
    ],
    componentPath: 'json-formatter',
    content: {
      longDescription: 'Format, validate, and beautify your JSON data with our free online JSON Formatter. Whether you are debugging API responses, editing configuration files, or working with data structures, our tool makes JSON readable and error-free. Paste your minified JSON and instantly get a properly indented, color-coded output. The validator catches syntax errors so you can fix them immediately. All processing happens client-side for maximum security.',
      howItWorks: [
        { step: '1', title: 'Paste JSON', desc: 'Copy and paste your JSON data into the input area' },
        { step: '2', title: 'Format or Minify', desc: 'Choose to beautify or minify your JSON' },
        { step: '3', title: 'Copy Result', desc: 'Copy the formatted JSON for use in your projects' },
      ],
      benefits: [
        { title: 'Instant Formatting', desc: 'Beautify minified JSON with proper indentation in one click' },
        { title: 'Error Detection', desc: 'Instantly identifies and highlights JSON syntax errors' },
        { title: 'Client-Side Only', desc: 'Your data never leaves your browser for maximum security' },
        { title: 'Free & Unlimited', desc: 'No restrictions on JSON size or number of uses' },
      ],
    },
  },
  {
    name: 'JWT Decoder',
    slug: 'jwt-decoder',
    description: 'Decode and inspect JWT tokens online. View header, payload, and signature information.',
    category: 'Developer', icon: 'Fingerprint',
    keywords: ['JWT decoder', 'decode JWT', 'JWT inspector', 'JWT debugger', 'JSON web token'],
    faq: [
      { q: 'Is JWT decoding safe?', a: 'Yes, decoding is done client-side. Your tokens never leave your browser.' },
    ],
    componentPath: 'jwt-decoder',
    content: {
      longDescription: 'Decode and inspect JWT tokens instantly with our free online JWT Decoder. Paste any JSON Web Token and view its decoded header, payload, and signature information. Perfect for developers debugging authentication flows, testing API tokens, or learning how JWT works. The decoder visually separates the three parts of the token and presents them in a readable JSON format. All decoding happens entirely in your browser for complete security.',
      howItWorks: [
        { step: '1', title: 'Paste JWT', desc: 'Copy and paste your JWT token into the input field' },
        { step: '2', title: 'Decode', desc: 'Click decode to parse the token components' },
        { step: '3', title: 'Inspect', desc: 'View decoded header and payload in readable JSON format' },
      ],
      benefits: [
        { title: 'Instant Decoding', desc: 'Decode any JWT token in milliseconds' },
        { title: 'Clear Visualization', desc: 'Header, payload, and signature clearly separated' },
        { title: 'Client-Side Security', desc: 'Tokens never sent to any server, decoded locally' },
        { title: 'Free Developer Tool', desc: 'Essential debugging tool for any developer' },
      ],
    },
  },
  {
    name: 'QR Code Generator',
    slug: 'qr-code-generator',
    description: 'Generate QR codes for URLs, text, and more. Free QR code generator with download.',
    category: 'Developer', icon: 'QrCode',
    keywords: ['QR code generator', 'QR generator', 'create QR code', 'QR code maker', 'free QR code'],
    faq: [
      { q: 'Can I download the QR code?', a: 'Yes, download your QR code as a high-quality PNG image.' },
    ],
    componentPath: 'qr-code-generator',
    content: {
      longDescription: 'Create custom QR codes instantly with our free QR Code Generator. Enter any URL or text and generate a high-quality QR code that you can download as a PNG image. Perfect for marketing materials, business cards, product packaging, event tickets, and digital menus. Our generator creates clean, scannable QR codes that work with all major QR code readers. No sign-ups, no limits, completely free.',
      howItWorks: [
        { step: '1', title: 'Enter Content', desc: 'Type the URL or text you want to encode' },
        { step: '2', title: 'Adjust Size', desc: 'Use the slider to choose QR code size (128px to 512px)' },
        { step: '3', title: 'Download', desc: 'Download your QR code as a high-quality PNG image' },
      ],
      benefits: [
        { title: 'High Quality Output', desc: 'Download clean, high-resolution PNG QR codes' },
        { title: 'Customizable Size', desc: 'Adjust QR code size from 128px to 512px' },
        { title: 'Instant Generation', desc: 'QR codes generated instantly in your browser' },
        { title: 'Commercial Use', desc: 'Generated QR codes can be used for any purpose' },
      ],
    },
  },
  {
    name: 'UUID Generator',
    slug: 'uuid-generator',
    description: 'Generate UUIDs/GUIDs online free. Supports v4, v7, and bulk generation.',
    category: 'Developer', icon: 'Hash',
    keywords: ['UUID generator', 'GUID generator', 'generate UUID', 'UUID v4', 'unique ID generator'],
    faq: [
      { q: 'What is a UUID?', a: 'A Universally Unique Identifier is a 128-bit label used for unique identification.' },
    ],
    componentPath: 'uuid-generator',
    content: {
      longDescription: 'Generate random UUIDs (Universally Unique Identifiers) instantly with our free online UUID Generator. Create one or hundreds of UUID v4 identifiers at once. Perfect for developers who need unique IDs for database records, API keys, session tokens, or any application requiring unique identifiers. Copy individual UUIDs or bulk copy all generated IDs at once. Fast, reliable, and completely free.',
      howItWorks: [
        { step: '1', title: 'Set Count', desc: 'Choose how many UUIDs to generate (1 to 100)' },
        { step: '2', title: 'Generate', desc: 'Click the generate button to create UUIDs' },
        { step: '3', title: 'Copy', desc: 'Copy individual UUIDs or all at once' },
      ],
      benefits: [
        { title: 'Bulk Generation', desc: 'Generate up to 100 UUIDs at once' },
        { title: 'Copy All', desc: 'Copy all generated UUIDs with one click' },
        { title: 'Standard Format', desc: 'Produces standard UUID v4 format' },
        { title: 'Client-Side', desc: 'Generated locally, no server calls' },
      ],
    },
  },

  // --- CRYPTO ---
  {
    name: 'Crypto Profit Calculator',
    slug: 'crypto-profit-calculator',
    description: 'Calculate your cryptocurrency profit, ROI, and break-even price. Free crypto calculator.',
    category: 'Crypto', icon: 'TrendingUp',
    keywords: ['crypto profit calculator', 'cryptocurrency calculator', 'Bitcoin profit', 'crypto ROI', 'investment calculator'],
    faq: [
      { q: 'How is crypto profit calculated?', a: 'Profit = (Selling Price - Cost Price) x Quantity - Fees. Our calculator handles all scenarios.' },
    ],
    componentPath: 'crypto-profit-calculator',
    content: {
      longDescription: 'Track your cryptocurrency investment returns with our free Crypto Profit Calculator. Enter your buy price, sell price, quantity, and fees to instantly calculate profit or loss, ROI percentage, and break-even price. Whether you are trading Bitcoin, Ethereum, or any other cryptocurrency, this tool gives you a clear picture of your investment performance. Make informed trading decisions and track your portfolio returns with our easy-to-use crypto calculator.',
      howItWorks: [
        { step: '1', title: 'Enter Trade Details', desc: 'Input buy price, sell price, quantity, and fees' },
        { step: '2', title: 'Calculate', desc: 'Click to compute profit, ROI, and break-even price' },
        { step: '3', title: 'Analyze Results', desc: 'Review your profit/loss and make informed decisions' },
      ],
      benefits: [
        { title: 'Instant Profit Calculation', desc: 'Know exactly how much you gained or lost on any trade' },
        { title: 'ROI Tracking', desc: 'See your return on investment as a clear percentage' },
        { title: 'Break-Even Analysis', desc: 'Know the price needed to break even on your position' },
        { title: 'Fee Included', desc: 'Account for trading fees in your profit calculation' },
      ],
    },
  },
]

export default tools
