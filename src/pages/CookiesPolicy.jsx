import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CookiesPolicy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
            <Navbar />
            <main className="container" style={{ paddingTop: '140px', paddingBottom: '100px', maxWidth: '800px' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--color-dark)' }}>
                    Cookies Policy
                </h1>
                <div style={{ marginBottom: '3rem' }}>
                    <p style={{ fontWeight: '600', color: 'var(--color-dark)', marginBottom: '0.25rem' }}>PenguinPrep – operated by CamelCaseAI</p>
                    <p style={{ color: 'var(--color-text)', fontSize: '1.1rem', fontWeight: '500' }}>
                        Effective date: January 1, 2026
                    </p>
                </div>

                <section style={{ lineHeight: '1.7', color: 'var(--color-text)', fontSize: '1.05rem' }}>
                    <div style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--color-dark)' }}>1. What are cookies?</h2>
                        <p style={{ marginBottom: '1rem' }}>
                            Cookies are small text files stored on your device (computer, tablet, or phone) when you visit a website or use an online service. They help the site remember your device and certain information about your visit.
                        </p>
                        <p style={{ marginBottom: '1rem' }}>We may also use similar technologies such as:</p>
                        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                            <li>local storage</li>
                            <li>session storage</li>
                            <li>web beacons or pixels (if added in the future)</li>
                        </ul>
                        <p>For simplicity, we refer to all of these as “cookies.”</p>
                    </div>

                    <div style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--color-dark)' }}>2. Do we use cookies?</h2>
                        <p style={{ marginBottom: '1rem' }}>Yes. PenguinPrep may use cookies and similar technologies to help operate and improve the service.</p>
                        <p>Because our platform is designed for children and students, we limit cookie use and do not use cookies for behavioral advertising.</p>
                    </div>

                    <div style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--color-dark)' }}>3. Types of cookies we may use</h2>

                        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>A. Strictly necessary cookies</h3>
                        <p style={{ marginBottom: '1rem' }}>These cookies are essential for the app or site to function.</p>
                        <p style={{ marginBottom: '0.5rem' }}>They may be used to:</p>
                        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                            <li>keep you logged in during a session</li>
                            <li>remember your quiz state or answers during a session</li>
                            <li>prevent fraud or misuse</li>
                            <li>maintain security</li>
                        </ul>
                        <p style={{ marginBottom: '1.5rem' }}>These cookies are required and cannot be disabled through our service.</p>

                        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>B. Performance and analytics cookies (optional)</h3>
                        <p style={{ marginBottom: '1rem' }}>If enabled in the future, these cookies would help us:</p>
                        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                            <li>understand how the app is used</li>
                            <li>fix errors</li>
                            <li>improve features and content</li>
                        </ul>
                        <p style={{ marginBottom: '1rem' }}>We do not use analytics to:</p>
                        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                            <li>build behavioral profiles of children</li>
                            <li>target advertising to children</li>
                        </ul>
                        <p style={{ marginBottom: '1.5rem' }}>If we add analytics tools that require consent, we will notify users and parents and request consent where required by law.</p>

                        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>C. Functionality cookies</h3>
                        <p style={{ marginBottom: '1rem' }}>These cookies help:</p>
                        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                            <li>remember preferences (such as nickname or display settings)</li>
                            <li>personalize learning experience</li>
                        </ul>
                        <p>They are optional but may improve usability.</p>
                    </div>

                    <div style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--color-dark)' }}>4. Cookies and children</h2>
                        <p style={{ marginBottom: '1rem' }}>Because PenguinPrep is used by children:</p>
                        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                            <li>we limit cookies to essential educational and operational purposes</li>
                            <li>we do not use cookies for behavioral advertising</li>
                            <li>we do not knowingly allow third parties to track children across websites for marketing</li>
                        </ul>
                        <p>Parents may contact us at <a href="mailto:camelcaseai@gmail.com" style={{ color: 'var(--color-primary)' }}>camelcaseai@gmail.com</a> to ask questions about our cookie practices.</p>
                    </div>

                    <div style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--color-dark)' }}>5. Third-party cookies</h2>
                        <p style={{ marginBottom: '1rem' }}>We may use trusted service providers to support our platform (for example, hosting providers or basic analytics).</p>
                        <p style={{ marginBottom: '1rem' }}>If third-party cookies are used, those providers:</p>
                        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                            <li>must use data only to provide services to us</li>
                            <li>must protect the data</li>
                            <li>must comply with children’s privacy laws</li>
                        </ul>
                        <p>We do not sell children’s personal information.</p>
                    </div>

                    <div style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--color-dark)' }}>6. How you can manage cookies</h2>
                        <p style={{ marginBottom: '1rem' }}>You can control cookies through:</p>
                        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                            <li>your browser settings</li>
                            <li>clearing cookies from your device</li>
                            <li>blocking certain types of cookies</li>
                        </ul>
                        <p style={{ marginBottom: '1rem' }}>Disabling some cookies may cause parts of PenguinPrep not to function properly, especially essential cookies.</p>
                        <p>Instructions are available in most browser help menus (e.g., Chrome, Safari, Firefox, Edge).</p>
                    </div>

                    <div style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--color-dark)' }}>7. Do we use cookies for advertising?</h2>
                        <p style={{ marginBottom: '1rem' }}>No. We do not use:</p>
                        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                            <li>targeted advertising cookies</li>
                            <li>behavioral advertising</li>
                            <li>third-party ad networks</li>
                        </ul>
                        <p>If this ever changes in the future, we will update this Cookies Policy and obtain required consents, especially for children.</p>
                    </div>

                    <div style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--color-dark)' }}>8. Changes to this Cookies Policy</h2>
                        <p style={{ marginBottom: '1rem' }}>We may update this Cookies Policy from time to time.</p>
                        <p style={{ marginBottom: '1rem' }}>When we do:</p>
                        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                            <li>the Effective Date at the top will change</li>
                            <li>material changes will be highlighted where appropriate</li>
                        </ul>
                        <p>Continued use of PenguinPrep after changes means you accept the updated policy.</p>
                    </div>

                    <div style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--color-dark)' }}>9. Contact us</h2>
                        <p style={{ marginBottom: '1rem' }}>If you have questions about this Cookies Policy or our use of cookies, please contact us:</p>
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

export default CookiesPolicy;
