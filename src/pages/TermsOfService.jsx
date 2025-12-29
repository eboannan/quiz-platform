import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TermsOfService = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
            <Navbar />
            <main className="container" style={{ paddingTop: '140px', paddingBottom: '100px', maxWidth: '800px' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--color-dark)' }}>
                    Terms of Service
                </h1>
                <div style={{ marginBottom: '3rem' }}>
                    <p style={{ fontWeight: '600', color: 'var(--color-dark)', marginBottom: '0.25rem' }}>PenguinPrep (CamelCaseAI)</p>
                    <p style={{ color: 'var(--color-text)', fontSize: '1.1rem', fontWeight: '500' }}>
                        Effective date: January 1, 2026
                    </p>
                </div>

                <section style={{ lineHeight: '1.7', color: 'var(--color-text)', fontSize: '1.05rem' }}>
                    <div style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--color-dark)' }}>1. Introduction</h2>
                        <p style={{ marginBottom: '1rem' }}>
                            Welcome to PenguinPrep, an educational quiz platform operated by CamelCaseAI (“we,” “us,” or “our”). These Terms of Service (“Terms”) govern your access to and use of PenguinPrep, including any content, features, and services offered through the app or website.
                        </p>
                        <p>
                            By accessing or using PenguinPrep, you agree to be bound by these Terms. If you do not agree, you may not use PenguinPrep.
                        </p>
                    </div>

                    <div style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--color-dark)' }}>2. Eligibility and Use by Children</h2>
                        <p style={{ marginBottom: '1rem' }}>PenguinPrep is designed for children and students of mixed ages, including minors.</p>
                        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                            <li>Children under 13 may use PenguinPrep only with parent or guardian consent</li>
                            <li>Parents/guardians are responsible for supervising use by minors</li>
                            <li>Educators using PenguinPrep with students must have appropriate permissions</li>
                        </ul>
                        <p style={{ marginBottom: '1rem' }}>We do not allow children to submit personal information beyond:</p>
                        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                            <li>nickname or automatically generated ID</li>
                            <li>quiz performance data</li>
                        </ul>
                        <p>We comply with applicable U.S. child privacy laws, including COPPA to the extent applicable.</p>
                    </div>

                    <div style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--color-dark)' }}>3. Accounts</h2>
                        <p style={{ marginBottom: '1rem' }}>To use some features, users may create an account.</p>
                        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                            <li>Nicknames or automatically generated IDs may be used</li>
                            <li>Real names are not required</li>
                            <li>You are responsible for keeping login information secure</li>
                            <li>We may suspend or terminate accounts that violate these Terms</li>
                            <li>We reserve the right to refuse registration or cancel accounts at our discretion</li>
                        </ul>
                    </div>

                    <div style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--color-dark)' }}>4. Educational Content and Service Description</h2>
                        <p style={{ marginBottom: '1rem' }}>PenguinPrep provides:</p>
                        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                            <li>practice quizzes</li>
                            <li>educational questions and answers</li>
                            <li>progress tracking features</li>
                        </ul>
                        <p style={{ marginBottom: '1rem' }}>We may add, modify, or remove features at any time.</p>
                        <p style={{ marginBottom: '1rem' }}>We do not guarantee:</p>
                        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                            <li>specific learning outcomes</li>
                            <li>test or grade performance</li>
                            <li>uninterrupted access to the service</li>
                        </ul>
                        <p>All content is for educational and informational purposes only.</p>
                    </div>

                    <div style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--color-dark)' }}>5. Payments and Fees</h2>
                        <p style={{ marginBottom: '1rem' }}>PenguinPrep may currently be free to use.</p>
                        <p style={{ marginBottom: '1rem' }}>We may introduce paid features or subscriptions in the future.</p>
                        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                            <li>Any fees will be clearly disclosed before purchase</li>
                            <li>You will have the opportunity to review and accept new terms</li>
                            <li>All sales are final unless required by law</li>
                        </ul>
                    </div>

                    <div style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--color-dark)' }}>6. User Conduct</h2>
                        <p style={{ marginBottom: '1rem' }}>You agree not to:</p>
                        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                            <li>attempt to interfere with or disrupt the service</li>
                            <li>use PenguinPrep for cheating or academic dishonesty</li>
                            <li>upload or distribute harmful code</li>
                            <li>use the platform for harassment, bullying, or inappropriate communication</li>
                        </ul>
                        <p>We may terminate access for violation of these rules.</p>
                    </div>

                    <div style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--color-dark)' }}>7. Intellectual Property</h2>
                        <p style={{ marginBottom: '1rem' }}>
                            All content available on PenguinPrep, including questions and answers, text, graphics, logos, and software, is owned by CamelCaseAI or licensed to us and protected by applicable intellectual property laws.
                        </p>
                        <p style={{ marginBottom: '1rem' }}>You may use the service only for personal, educational, non-commercial purposes.</p>
                        <p style={{ marginBottom: '1rem' }}>You may not:</p>
                        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                            <li>copy or redistribute large portions of content</li>
                            <li>reverse engineer the platform</li>
                            <li>use our trademarks without permission</li>
                        </ul>
                    </div>

                    <div style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--color-dark)' }}>8. Data We Collect and How We Use It</h2>
                        <p style={{ marginBottom: '1rem' }}>We may collect:</p>
                        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                            <li>nickname or auto-generated user ID</li>
                            <li>quiz answers and scores</li>
                            <li>general usage information (app activity, device type)</li>
                        </ul>
                        <p style={{ marginBottom: '1rem' }}>We do not require:</p>
                        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                            <li>real names</li>
                            <li>photo uploads</li>
                            <li>chat or messaging features</li>
                        </ul>
                        <p style={{ marginBottom: '1rem' }}>Data is used for:</p>
                        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                            <li>showing progress</li>
                            <li>improving educational content</li>
                            <li>maintaining service functionality</li>
                        </ul>
                        <p>For more information, please see our Privacy Policy.</p>
                    </div>

                    <div style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--color-dark)' }}>9. Termination of Service</h2>
                        <p style={{ marginBottom: '1rem' }}>We may suspend or terminate accounts or access if:</p>
                        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                            <li>Terms are violated</li>
                            <li>fraudulent or abusive activity occurs</li>
                            <li>the service is discontinued</li>
                        </ul>
                        <p>You may stop using PenguinPrep at any time.</p>
                    </div>

                    <div style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--color-dark)' }}>10. Disclaimer of Warranties</h2>
                        <p style={{ marginBottom: '1rem' }}>PenguinPrep is provided “as is” and “as available” without warranties of any kind, including implied warranties of merchantability, fitness for a particular purpose, or non-infringement.</p>
                        <p style={{ marginBottom: '1rem' }}>We do not guarantee:</p>
                        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                            <li>error-free operation</li>
                            <li>uninterrupted service</li>
                            <li>accuracy of content</li>
                        </ul>
                    </div>

                    <div style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--color-dark)' }}>11. Limitation of Liability</h2>
                        <p style={{ marginBottom: '1rem' }}>To the fullest extent permitted by law, CamelCaseAI, its owners, and affiliates are not liable for:</p>
                        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                            <li>indirect, incidental, or consequential damages</li>
                            <li>loss of data</li>
                            <li>loss of profits</li>
                            <li>interruptions to service</li>
                        </ul>
                        <p style={{ marginBottom: '1rem' }}>
                            Our total liability for any claim will not exceed the amount you paid to use PenguinPrep in the previous 12 months (or zero if free).
                        </p>
                        <p>Some jurisdictions do not allow certain limitations, so parts of this section may not apply.</p>
                    </div>

                    <div style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--color-dark)' }}>12. Changes to These Terms</h2>
                        <p style={{ marginBottom: '1rem' }}>We may update these Terms from time to time.</p>
                        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                            <li>Changes will be posted with a new “Effective Date”</li>
                            <li>Continued use of PenguinPrep after changes means you accept the updated Terms</li>
                        </ul>
                    </div>

                    <div style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--color-dark)' }}>13. Governing Law</h2>
                        <p>These Terms are governed by the laws of the State of California, without regard to conflict-of-law principles.</p>
                    </div>

                    <div style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--color-dark)' }}>14. Contact Us</h2>
                        <p style={{ marginBottom: '1rem' }}>If you have questions about these Terms, please contact us:</p>
                        <p>Email: <a href="mailto:camelcaseai@gmail.com" style={{ color: 'var(--color-primary)' }}>camelcaseai@gmail.com</a></p>
                        <p>Business name: CamelCaseAI</p>
                        <p>App name: PenguinPrep</p>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default TermsOfService;
