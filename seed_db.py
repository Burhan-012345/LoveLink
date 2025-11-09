from app import app, db, Letter, Reason, Shayri
import os

def seed_data():
    with app.app_context():
        try:
            # Check if tables exist, if not create them
            db.create_all()
            
            # Clear existing data (use try-except to handle empty tables)
            try:
                db.session.query(Letter).delete()
                db.session.query(Reason).delete()
                db.session.query(Shayri).delete()
                db.session.commit()
            except:
                db.session.rollback()
                print("⚠️  Tables were empty or didn't exist, creating fresh...")
        
            # Seed Letters
            letters_data = [
                {
                    'title': 'Aapki Muskaan, Mera Sukoon',
                    'content': '''Jab bhi aap muskurate hain na, lagta hai jaise poori duniya roshan ho gayi ho.  
Aapki ek chhoti si hansi mere din ka sabse khoobsurat hissa hoti hai.  
Main roz dua karta hoon ki aap hamesha muskurate rahein. 💖''',
                    'order_index': 1,
                    'mood_tag': 'romantic'
                },
                {
                    'title': 'Aap Meri Kahani Ka Hissa Hain',
                    'content': '''Aap aaye to zindagi ek kahani ban gayi.  
Har chapter mein aapka naam likha hai — har line mein aapki muskaan.  
Aap hi meri kahani ka sabse khoobsurat hissa hain. 🌸''',
                    'order_index': 2,
                    'mood_tag': 'emotional'
                },
                {
                    'title': 'Mujhe Aap Par Fakhar Hai',
                    'content': '''Aap jaisa dil, aaj ke zamaane mein milta hi kahaan hai.  
Aap sirf khoobsurat nahi, ek pyaari si rooh bhi hain.  
Main khushnaseeb hoon ki mujhe aap mile. 💫''',
                    'order_index': 3,
                    'mood_tag': 'proud'
                },
                {
                    'title': 'Sirf Aap',
                    'content': '''Log kehte hain pyaar mushkil hota hai,  
par jab baat aapki aati hai to sab aasaan lagta hai.  
Aap meri duniya ka sabse khoobsurat ehsaas hain. ❤️''',
                    'order_index': 4,
                    'mood_tag': 'deep'
                },
                {
                    'title': 'Hamesha Aapke Saath',
                    'content': '''Main chahta hoon har subah aapke saath ho,  
har shaam aapke bina adhoori lage.  
Yahi toh hai LoveLock ka vaada — hamesha sirf aap. 💞''',
                    'order_index': 5,
                    'mood_tag': 'promise'
                }
            ]
            
            for letter_data in letters_data:
                letter = Letter(**letter_data)
                db.session.add(letter)
            
            # Seed Reasons
            reasons_data = [
                "Aapki smile mere din ko roshan kar deti hai.",
                "Aap bina bole sab samajh leti hain.",
                "Aap meri zindagi ki sabse pyaari aadat hain.",
                "Aap meri sabse badi dua ka jawaab hain.",
                "Aapki aawaaz sunkar hi mera dil khush ho jata hai.",
                "Aap har mushkil mein mera saath deti hain.",
                "Aapki har aadat mujhe pyaari lagti hai.",
                "Aap mere sapnon ki raani hain.",
                "Aapke bina meri duniya adhoori hai.",
                "Aap hamesha mere liye dua karti hain."
            ]
            
            for reason in reasons_data:
                reason_obj = Reason(reason=reason)
                db.session.add(reason_obj)
            
            # Seed Shayris
            shayris_data = [
                {
                    'content': '''Teri muskurahat ki hai jo baat kuchh aur,
Dil ko lagta hai mil gaya jannat kuchh aur,
Hum to samjhe the mohabbat hai ek dhuaan,
Tujhko dekha to lagta hai hai mohabbat kuchh aur.''',
                    'category': 'romantic',
                    'mood': 'love',
                    'order_index': 1
                },
                {
                    'content': '''Tere ishq ne mujhe itna pagal bana diya,
Khud se hi baatein karne pe majboor kar diya,
Har lamhe mein bas tujhe hi dekhta rehta hun,
Tune to meri duniya hi badal kar rakh di.''',
                    'category': 'romantic',
                    'mood': 'passionate',
                    'order_index': 2
                },
                {
                    'content': '''Dil ki dhadkan ban gayi ho tum,
Saansein ban gayi ho tum,
Kya batayein kaise humko,
Zindagi ban gayi ho tum.''',
                    'category': 'emotional',
                    'mood': 'deep',
                    'order_index': 3
                },
                {
                    'content': '''Tere bina zindagi adhoori si lagti hai,
Har khushi bhi khaali si lagti hai,
Tujhse milkar hi to lagta hai,
Yeh zindagi koi zindagi lagti hai.''',
                    'category': 'emotional',
                    'mood': 'longing',
                    'order_index': 4
                },
                {
                    'content': '''Mohabbat ki rahon mein hum dono chalenge,
Dilon ki dastaan likhenge,
Har mushkil ka saath denge,
Aise hi hamesha saath rahenge.''',
                    'category': 'promise',
                    'mood': 'committed',
                    'order_index': 5
                },
                {
                    'content': '''Teri aankhon mein base hain mere sapne,
Teri baaton mein chhupe hain mere armaan,
Tujhse hi shuru hoti hai meri subah,
Tujhpe hi khatam hoti hai meri shaam.''',
                    'category': 'romantic',
                    'mood': 'dreamy',
                    'order_index': 6
                },
                {
                    'content': '''Ishq hai to har mushkil aasaan lagti hai,
Zindagi bhi ab haseen si lagti hai,
Tere saath bita har pal hai khaas,
Bas yahi dua hai rabb se har baar.''',
                    'category': 'spiritual',
                    'mood': 'grateful',
                    'order_index': 7
                },
                {
                    'content': '''Tum ho to har lamha khushnuma lagta hai,
Tum ho to har raat chandni lagti hai,
Tumhare bina to kuchh bhi nahi hai,
Tum ho meri duniya, meri kahani lagti hai.''',
                    'category': 'romantic',
                    'mood': 'complete',
                    'order_index': 8
                },
                {
                    'content': '''Dil ki gehraiyon se ek baat kehni hai,
Tumse mohabbat karni hai,
Tumhare saath bitaye har pal ko,
Zindagi bhar yaad karni hai.''',
                    'category': 'emotional',
                    'mood': 'sincere',
                    'order_index': 9
                },
                {
                    'content': '''Tere ishq ne di hai mujhe nayi pehchaan,
Bana diya hai tu mera imaan,
Har duaa mein bas tera hi naam,
Tujhse hi shuru, tujhpe hi khatam.''',
                    'category': 'spiritual',
                    'mood': 'devotional',
                    'order_index': 10
                },
                {
                    'content': '''Tumhari yaadon ka silsila chala hai,
Dil ki gehraiyon se rishta juda hai,
Har pal tumhare saath bitana chahta hun,
Yeh dil kehta hai bas tumhi to ho meri duniya.''',
                    'category': 'romantic',
                    'mood': 'yearning',
                    'order_index': 11
                },
                {
                    'content': '''Mohabbat ki yeh dastaan likh raha hun,
Tere naam se har safa saja raha hun,
Tujhko paakar khud ko naseebon wala maan raha hun,
Bas tere saath jeena aur marna sweekar raha hun.''',
                    'category': 'promise',
                    'mood': 'eternal',
                    'order_index': 12
                }
            ]
            
            for shayri_data in shayris_data:
                shayri = Shayri(**shayri_data)
                db.session.add(shayri)
            
            db.session.commit()
            print("✅ Database seeded successfully with letters, reasons, and shayris!")
            print(f"📊 Added: {len(letters_data)} letters, {len(reasons_data)} reasons, {len(shayris_data)} shayris")
            
        except Exception as e:
            print(f"❌ Error seeding database: {e}")
            db.session.rollback()

if __name__ == '__main__':
    seed_data()