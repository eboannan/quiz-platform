import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
            <Navbar />
            <main className="container" style={{ paddingTop: '140px', paddingBottom: '100px', maxWidth: '800px' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--color-dark)' }}>
                    PenguinPrep Privacy Policy
                </h1>
                <p style={{ color: 'var(--color-text)', fontSize: '1.1rem', marginBottom: '3rem', fontWeight: '500' }}>
                    Effective Date: January 1, 2026
                </p>

                <section style={{ lineHeight: '1.7', color: 'var(--color-text)', fontSize: '1.05rem' }}>
                    <p style={{ marginBottom: '1.5rem' }}>
                        CamelCaseAI (“we,” “us,” “our”) operates the PenguinPrep learning platform (“PenguinPrep” or the “Service”). We respect your privacy and are committed to protecting the personal information of children, parents, and other users.
                    </p>
                    <p style={{ marginBottom: '1.5rem' }}>
                        This Privacy Policy explains how we collect, use, and protect information when you and your child use PenguinPrep.
                    </p>
                    <p style={{ marginBottom: '2.5rem' }}>
                        PenguinPrep is designed for children and teens and is used with the permission and supervision of a parent or legal guardian.
                    </p>

                    <div style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--color-dark)' }}>1. Who this policy applies to</h2>
                        <p>This policy applies to:</p>
                        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                            <li>parents and legal guardians</li>
                            <li>children under age 13</li>
                            <li>teens ages 13–17</li>
                            <li>teachers or caregivers who may help children use the app</li>
                        </ul>
                        <p>Parents and legal guardians are responsible for reviewing and agreeing to this policy before a child uses PenguinPrep.</p>
                    </div>

                    <div style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--color-dark)' }}>2. Information we collect</h2>
                        <p style={{ marginBottom: '1rem' }}>We intentionally collect the minimum amount of information necessary to run quizzes and show progress.</p>

                        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>2.1 Parent account information</h3>
                        <p style={{ marginBottom: '1rem' }}>When a parent creates an account, we may collect:</p>
                        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                            <li>parent name</li>
                            <li>parent email address</li>
                            <li>password</li>
                            <li>consent confirmation</li>
                        </ul>

                        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>2.2 Child profile information</h3>
                        <p style={{ marginBottom: '1rem' }}>For children, we collect only:</p>
                        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                            <li>nickname or system-generated ID</li>
                            <li>age or age range (not full birthdate)</li>
                            <li>quiz activity and scores</li>
                        </ul>
                        <p style={{ marginBottom: '1rem' }}>We do not require:</p>
                        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                            <li>child email address</li>
                            <li>child last name</li>
                            <li>photographs or audio</li>
                            <li>phone number</li>
                        </ul>

                        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>2.3 Automatically collected technical information</h3>
                        <p style={{ marginBottom: '1rem' }}>To operate the Service securely, we may collect:</p>
                        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                            <li>basic device information</li>
                            <li>IP address for security and fraud prevention</li>
                            <li>error logs</li>
                        </ul>
                        <p style={{ marginBottom: '1rem' }}>We do not use this information to profile or advertise to children.</p>

                        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>2.4 What we do NOT collect</h3>
                        <p style={{ marginBottom: '1rem' }}>PenguinPrep does not collect:</p>
                        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                            <li>photos or videos</li>
                            <li>voice recordings</li>
                            <li>chat messages</li>
                            <li>social media data</li>
                            <li>precise geolocation</li>
                            <li>advertising identifiers</li>
                        </ul>
                        <p>PenguinPrep also does not sell user data.</p>
                    </div>

                    <div style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--color-dark)' }}>3. Quiz data</h2>
                        <p style={{ marginBottom: '1rem' }}>We store:</p>
                        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                            <li>quizzes taken</li>
                            <li>answers selected</li>
                            <li>scores and progress</li>
                        </ul>
                        <p style={{ marginBottom: '1rem' }}>This information is used to:</p>
                        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                            <li>show progress reports</li>
                            <li>help parents understand learning progress</li>
                            <li>improve learning content</li>
                        </ul>
                        <p>Children are identified only by nickname or auto-generated ID.</p>
                    </div>

                    <div style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--color-dark)' }}>4. Parental consent (COPPA compliance)</h2>
                        <p style={{ marginBottom: '1rem' }}>PenguinPrep follows the U.S. Children’s Online Privacy Protection Act (COPPA).</p>
                        <p style={{ marginBottom: '1rem' }}>We obtain verifiable parental consent before:</p>
                        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                            <li>creating a child profile</li>
                            <li>collecting personal information from a child</li>
                        </ul>
                        <p style={{ marginBottom: '1rem' }}>Parents:</p>
                        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                            <li>create their own account</li>
                            <li>review this policy</li>
                            <li>provide consent before child use</li>
                        </ul>
                        <p style={{ marginBottom: '1rem' }}>Parents may at any time:</p>
                        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                            <li>withdraw consent</li>
                            <li>request deletion of child data</li>
                            <li>review their child’s information</li>
                        </ul>
                        <p>See Section 9 for how to contact us.</p>
                    </div>

                    <div style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--color-dark)' }}>5. How we use information</h2>
                        <p style={{ marginBottom: '1rem' }}>We use information to:</p>
                        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                            <li>create and manage accounts</li>
                            <li>provide quizzes and learning content</li>
                            <li>save quiz scores and progress</li>
                            <li>respond to customer support requests</li>
                            <li>meet legal and security requirements</li>
                        </ul>
                        <p style={{ marginBottom: '1rem' }}>We do not:</p>
                        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                            <li>sell personal data</li>
                            <li>use behavioral advertising</li>
                            <li>target ads to children</li>
                        </ul>
                    </div>

                    <div style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--color-dark)' }}>6. Information sharing</h2>
                        <p style={{ marginBottom: '1rem' }}>We do not sell or rent personal information.</p>
                        <p style={{ marginBottom: '1rem' }}>We may share information only with:</p>
                        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                            <li>service providers who operate the platform (e.g., hosting providers)</li>
                            <li>law enforcement if required by law</li>
                            <li>in connection with a business transfer (with notice to parents)</li>
                        </ul>
                        <p style={{ marginBottom: '1rem' }}>Service providers are required to:</p>
                        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                            <li>use data only to provide services</li>
                            <li>keep data secure</li>
                            <li>follow child privacy laws</li>
                        </ul>
                        <p>We do not allow third parties to advertise to children through our service.</p>
                    </div>

                    <div style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--color-dark)' }}>7. Data retention and deletion</h2>
                        <p style={{ marginBottom: '1rem' }}>We keep information only as long as needed to provide the Service.</p>
                        <p style={{ marginBottom: '1rem' }}>Parents may:</p>
                        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                            <li>request deletion of a child profile</li>
                            <li>close their account</li>
                            <li>request removal of parent information</li>
                        </ul>
                        <p style={{ marginBottom: '1rem' }}>When accounts are deleted:</p>
                        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                            <li>child profiles and scores are removed or anonymized</li>
                            <li>backups are deleted on their normal schedule</li>
                        </ul>
                    </div>

                    <div style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--color-dark)' }}>8. Your privacy rights (California residents)</h2>
                        <p style={{ marginBottom: '1rem' }}>If you live in California, you have rights under:</p>
                        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                            <li>CCPA/CPRA (California Consumer Privacy Rights Act)</li>
                            <li>California Age-Appropriate Design Code</li>
                        </ul>
                        <p style={{ marginBottom: '1rem' }}>These may include the right to:</p>
                        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                            <li>know what information we collect</li>
                            <li>access personal information</li>
                            <li>request deletion</li>
                            <li>correct inaccurate information</li>
                            <li>opt out of sale or sharing (we do not sell data)</li>
                        </ul>
                        <p>We respond to requests from parents or legal guardians regarding children’s data.</p>
                    </div>

                    <div style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--color-dark)' }}>9. How parents can contact us about child information</h2>
                        <p style={{ marginBottom: '1rem' }}>Parents may at any time:</p>
                        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                            <li>review their child’s information</li>
                            <li>withdraw consent</li>
                            <li>request deletion</li>
                        </ul>
                        <div style={{ backgroundColor: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                            <p style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Contact us at:</p>
                            <p>CamelCaseAI</p>
                            <p>Email: <a href="mailto:camelcaseai@gmail.com" style={{ color: 'var(--color-primary)' }}>camelcaseai@gmail.com</a></p>
                            <p style={{ marginTop: '1rem', fontStyle: 'italic' }}>Please include your name, your child’s nickname or ID, and a description of your request. We may take reasonable steps to verify your identity.</p>
                        </div>
                    </div>

                    <div style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--color-dark)' }}>10. Security</h2>
                        <p style={{ marginBottom: '1rem' }}>We use reasonable administrative, technical, and physical safeguards to protect information, including:</p>
                        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                            <li>encryption in transit</li>
                            <li>restricted database access</li>
                            <li>monitoring for unauthorized access</li>
                        </ul>
                        <p>No system is 100% secure, but we work to protect all children’s data.</p>
                    </div>

                    <div style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--color-dark)' }}>11. Changes to this Privacy Policy</h2>
                        <p style={{ marginBottom: '1rem' }}>We may update this Privacy Policy from time to time.</p>
                        <p style={{ marginBottom: '1rem' }}>If we make material changes:</p>
                        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                            <li>we will post an updated version</li>
                            <li>parents will be notified using the email on file</li>
                            <li>continued use after changes means acceptance</li>
                        </ul>
                    </div>

                    <div style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--color-dark)' }}>12. International users</h2>
                        <p style={{ marginBottom: '1rem' }}>PenguinPrep is intended for users in the United States.</p>
                        <p>If you use it from other locations, your information may be processed in the U.S.</p>
                    </div>

                    <div style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--color-dark)' }}>13. Contact Us</h2>
                        <p style={{ marginBottom: '1rem' }}>If you have questions about this policy or your child’s privacy, contact:</p>
                        <p style={{ fontWeight: '600' }}>CamelCaseAI</p>
                        <p>Email: <a href="mailto:camelcaseai@gmail.com" style={{ color: 'var(--color-primary)' }}>camelcaseai@gmail.com</a></p>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
