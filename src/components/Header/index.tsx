import Image from 'next/image';
import logoSvg from '../../../public/images/logo.svg';
import { SignInButton } from '../SignInButton';
import styles from './styles.module.scss';
import { ActiveLink } from '../ActiveLink';

export function Header() {



    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Image src={logoSvg} alt=" ignews seu blog de tecnologia" />
                <nav>
                    <ActiveLink activeClassName={styles.active} href="/">
                        <a>Home</a>
                    </ActiveLink>

                    <ActiveLink activeClassName={styles.active} href="/posts">
                        <a>Posts</a>
                    </ActiveLink>

                </nav>
                <SignInButton />
            </div>
        </header>
    )
}