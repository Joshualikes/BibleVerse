import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Play, Pause, Heart, Share, Volume2, VolumeX, RotateCcw, Menu, Clock, Globe, Settings } from 'lucide-react-native';
import { Audio } from 'expo-av';
import { HamburgerMenu } from '@/components/HamburgerMenu';

// Comprehensive daily verses database
const dailyVerses = [
  {
    id: 1,
    date: 'Monday',
    headerImage: require('@/assets/images/background1.png'),
    verse: {
      english: {
        reference: "Psalm 23:1",
        text: "The Lord is my shepherd, I lack nothing."
      },
      tagalog: {
        reference: "Awit 23:1",
        text: "Ang Panginoon ang aking pastor; hindi ako magkakakulang."
      },
      audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
    },
    reflection: {
      english: {
        title: "Monday's Reflection",
        text: "Just as a shepherd cares for his sheep, God cares for us with perfect love. He provides everything we need and guides us through life's journey. Today, trust in His provision and guidance."
      },
      tagalog: {
        title: "Pagninilay ng Lunes",
        text: "Tulad ng isang pastor na nag-aalaga sa kanyang mga tupa, nag-aalaga sa atin ang Diyos nang may perpektong pagmamahal. Binibigay Niya ang lahat ng aming pangangailangan at ginagabayan tayo sa paglalakbay ng buhay. Ngayong araw, magtiwala sa Kanyang pagkakaloob at paggabay."
      },
      audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
    }
  },
  {
    id: 2,
    date: 'Tuesday',
    headerImage: require('@/assets/images/background1.png'),
    verse: {
      english: {
        reference: "Philippians 4:13",
        text: "I can do all this through him who gives me strength."
      },
      tagalog: {
        reference: "Mga Taga-Filipos 4:13",
        text: "Lahat ng bagay ay magagawa ko sa pamamagitan ni Cristo na nagbibigay sa akin ng lakas."
      },
      audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
    },
    reflection: {
      english: {
        title: "Tuesday's Reflection",
        text: "When we face challenges, we don't face them alone. Christ gives us the strength to overcome any obstacle. His power works through us, enabling us to do things we never thought possible."
      },
      tagalog: {
        title: "Pagninilay ng Martes",
        text: "Kapag nakaharap tayo sa mga hamon, hindi tayo nag-iisa. Binibigyan tayo ni Cristo ng lakas upang malampasan ang anumang hadlang. Ang Kanyang kapangyarihan ay gumagana sa atin, na nagbibigay-daan sa atin na gawin ang mga bagay na hindi natin inakala na kaya natin."
      },
      audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
    }
  },
  {
    id: 3,
    date: 'Wednesday',
    headerImage: require('@/assets/images/background1.png'),
    verse: {
      english: {
        reference: "Jeremiah 29:11",
        text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, to give you hope and a future."
      },
      tagalog: {
        reference: "Jeremias 29:11",
        text: "Sapagkat alam ko ang mga plano na mayroon ako para sa inyo, sabi ng Panginoon, mga planong magpapalago sa inyo at hindi makakapinsala, upang bigyan kayo ng pag-asa at kinabukasan."
      },
      audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
    },
    reflection: {
      english: {
        title: "Wednesday's Reflection",
        text: "God has wonderful plans for your life! Even when we can't see the path ahead clearly, we can trust that God is working everything together for our good. His plans bring hope and a bright future."
      },
      tagalog: {
        title: "Pagninilay ng Miyerkules",
        text: "May mga kahanga-hangang plano ang Diyos para sa inyong buhay! Kahit na hindi natin makita nang malinaw ang daan sa harap, maaari nating pagtiwalaan na ginagawa ng Diyos ang lahat para sa aming kabutihan. Ang Kanyang mga plano ay nagdudulot ng pag-asa at maliwanag na kinabukasan."
      },
      audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
    }
  },
  {
    id: 4,
    date: 'Thursday',
    headerImage: require('@/assets/images/background1.png'),
    verse: {
      english: {
        reference: "Isaiah 40:31",
        text: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint."
      },
      tagalog: {
        reference: "Isaias 40:31",
        text: "Ngunit ang mga umaasa sa Panginoon ay mababago ang kanilang lakas. Sila ay lilipad na may mga pakpak na tulad ng mga agila; sila ay tatakbo at hindi mapapagod, sila ay maglalakad at hindi mahihina."
      },
      audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
    },
    reflection: {
      english: {
        title: "Thursday's Reflection",
        text: "When we feel tired or discouraged, God promises to renew our strength. Like eagles that soar high above the storms, we can rise above our challenges when we put our hope in the Lord."
      },
      tagalog: {
        title: "Pagninilay ng Huwebes",
        text: "Kapag nakakaramdam tayo ng pagod o pagkawalang-pag-asa, nangako ang Diyos na babaguhin ang aming lakas. Tulad ng mga agila na lumilipad sa itaas ng mga bagyo, maaari tayong tumaas sa aming mga hamon kapag inilagay natin ang aming pag-asa sa Panginoon."
      },
      audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
    }
  },
  {
    id: 5,
    date: 'Friday',
    headerImage: require('@/assets/images/background1.png'),
    verse: {
      english: {
        reference: "Romans 8:28",
        text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose."
      },
      tagalog: {
        reference: "Mga Taga-Roma 8:28",
        text: "At alam namin na sa lahat ng mga bagay ay gumagawa ang Diyos para sa kabutihan ng mga umiibig sa kaniya, na tinawag ayon sa kanyang layunin."
      },
      audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
    },
    reflection: {
      english: {
        title: "Friday's Reflection",
        text: "Even in difficult times, God is working behind the scenes for our good. Every experience, both joyful and challenging, is part of His greater plan to shape us and bless us."
      },
      tagalog: {
        title: "Pagninilay ng Biyernes",
        text: "Kahit sa mga mahirap na panahon, gumagawa ang Diyos sa likod para sa aming kabutihan. Ang bawat karanasan, masaya man o mahirap, ay bahagi ng Kanyang mas malaking plano upang hubugin tayo at pagpalain."
      },
      audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
    }
  },
  {
    id: 6,
    date: 'Saturday',
    headerImage: require('@/assets/images/background1.png'),
    verse: {
      english: {
        reference: "Psalm 145:18-19",
        text: "The Lord is near to all who call on him, to all who call on him in truth. He fulfills the desires of those who fear him; he hears their cry and saves them."
      },
      tagalog: {
        reference: "Awit 145:18-19",
        text: "Ang Panginoon ay malapit sa lahat ng tumatawag sa kaniya, sa lahat ng tumatawag sa kaniya sa katotohanan. Ginagawa niya ang mga nais ng mga natatakot sa kaniya; naririnig niya ang kanilang daing at iniligtas sila."
      },
      audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
    },
    reflection: {
      english: {
        title: "Saturday's Reflection",
        text: "God is always close to us when we call upon Him with sincere hearts. Just like a loving parent who listens to their children, our Heavenly Father hears every prayer and knows every need."
      },
      tagalog: {
        title: "Pagninilay ng Sabado",
        text: "Ang Diyos ay laging malapit sa atin kapag tumatawag tayo sa Kaniya nang may tapat na puso. Tulad ng isang mapagmahal na magulang na nakikinig sa kanilang mga anak, ang aming Ama sa langit ay naririnig ang bawat panalangin at alam ang bawat pangangailangan."
      },
      audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
    }
  },
  {
    id: 7,
    date: 'Sunday',
    headerImage: require('@/assets/images/background1.png'),
    verse: {
      english: {
        reference: "Matthew 11:28",
        text: "Come to me, all you who are weary and burdened, and I will give you rest."
      },
      tagalog: {
        reference: "Mateo 11:28",
        text: "Halina sa akin, kayong lahat na pagod at may pasan, at bibigyan ko kayo ng kapahingahan."
      },
      audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
    },
    reflection: {
      english: {
        title: "Sunday's Reflection",
        text: "Jesus invites us to come to Him when we feel tired or overwhelmed. In His presence, we find peace, comfort, and the rest our souls need. Today is a perfect day to rest in His love."
      },
      tagalog: {
        title: "Pagninilay ng Linggo",
        text: "Inanyayahan tayo ni Jesus na lumapit sa Kaniya kapag nakakaramdam tayo ng pagod o pagkakabalisa. Sa Kanyang presensya, nakakakita tayo ng kapayapaan, kaaliw, at ang pahinga na kailangan ng aming mga kaluluwa. Ang araw na ito ay perpektong araw upang magpahinga sa Kanyang pagmamahal."
      },
      audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
    }
  }
];

export default function DailyScreen() {
  const [isPlayingVerse, setIsPlayingVerse] = useState(false);
  const [isPlayingReflection, setIsPlayingReflection] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [verseSound, setVerseSound] = useState<Audio.Sound | null>(null);
  const [reflectionSound, setReflectionSound] = useState<Audio.Sound | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [language, setLanguage] = useState<'english' | 'tagalog'>('english');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [userTimezone, setUserTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [weeklyProgress, setWeeklyProgress] = useState<{[key: string]: boolean}>({});
  const [showTimezoneSettings, setShowTimezoneSettings] = useState(false);
  const insets = useSafeAreaInsets();

  // Get current day's verse
  const getCurrentDayVerse = () => {
    const dayOfWeek = currentDate.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const verseIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Adjust so Monday = 0, Sunday = 6
    return dailyVerses[verseIndex];
  };

  const currentVerse = getCurrentDayVerse();

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentDate(now);
      
      // Check if it's a new day and mark progress
      const today = now.toDateString();
      if (!weeklyProgress[today]) {
        // Auto-mark today as viewed when the verse changes
        setWeeklyProgress(prev => ({
          ...prev,
          [today]: true
        }));
      }
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, [weeklyProgress]);

  // Load weekly progress from storage (in a real app, this would be AsyncStorage)
  useEffect(() => {
    // Initialize current week's progress
    const today = new Date();
    const currentWeek = getWeekDates(today);
    const initialProgress: {[key: string]: boolean} = {};
    
    currentWeek.forEach(date => {
      const dateString = date.toDateString();
      // Mark today as viewed when component mounts
      if (date.toDateString() === today.toDateString()) {
        initialProgress[dateString] = true;
      } else {
        initialProgress[dateString] = false;
      }
    });
    
    setWeeklyProgress(initialProgress);
  }, []);

  const getWeekDates = (date: Date) => {
    const week = [];
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    startOfWeek.setDate(diff);

    for (let i = 0; i < 7; i++) {
      const weekDate = new Date(startOfWeek);
      weekDate.setDate(startOfWeek.getDate() + i);
      week.push(weekDate);
    }
    return week;
  };

  const formatDateTime = (date: Date, timezone: string) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: timezone,
      timeZoneName: 'short'
    }).format(date);
  };

  const handleThemes = () => {
    console.log('Opening themes...');
  };

  const handleRewards = () => {
    console.log('Opening rewards...');
  };

  const handleCompleted = () => {
    console.log('Opening completed gallery...');
  };

  const handleTimezoneChange = () => {
    Alert.alert(
      'Change Timezone',
      'Select your timezone:',
      [
        { text: 'Manila (GMT+8)', onPress: () => setUserTimezone('Asia/Manila') },
        { text: 'New York (GMT-5)', onPress: () => setUserTimezone('America/New_York') },
        { text: 'London (GMT+0)', onPress: () => setUserTimezone('Europe/London') },
        { text: 'Tokyo (GMT+9)', onPress: () => setUserTimezone('Asia/Tokyo') },
        { text: 'Auto-detect', onPress: () => setUserTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone) },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  useEffect(() => {
    // Configure audio mode for playback
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: false,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    });

    return () => {
      // Cleanup audio on unmount
      if (verseSound) {
        verseSound.unloadAsync();
      }
      if (reflectionSound) {
        reflectionSound.unloadAsync();
      }
    };
  }, [verseSound, reflectionSound]);

  const toggleVerseAudio = async () => {
    if (audioEnabled) {
      try {
        if (isPlayingVerse) {
          // Pause current audio
          if (verseSound) {
            await verseSound.pauseAsync();
            setIsPlayingVerse(false);
          }
        } else {
          // Stop reflection audio if playing
          if (reflectionSound && isPlayingReflection) {
            await reflectionSound.stopAsync();
            setIsPlayingReflection(false);
          }

          // Load and play verse audio
          if (!verseSound) {
            const { sound } = await Audio.Sound.createAsync(
              { uri: currentVerse.verse.audioUrl },
              { shouldPlay: true }
            );
            setVerseSound(sound);
            setIsPlayingVerse(true);

            // Set up playback status listener
            sound.setOnPlaybackStatusUpdate((status) => {
              if (status.isLoaded && status.didJustFinish) {
                setIsPlayingVerse(false);
              }
            });
          } else {
            await verseSound.replayAsync();
            setIsPlayingVerse(true);
          }
        }
      } catch (error) {
        console.error('Error playing verse audio:', error);
        setIsPlayingVerse(false);
      }
    }
  };

  const toggleReflectionAudio = async () => {
    if (audioEnabled) {
      try {
        if (isPlayingReflection) {
          // Pause current audio
          if (reflectionSound) {
            await reflectionSound.pauseAsync();
            setIsPlayingReflection(false);
          }
        } else {
          // Stop verse audio if playing
          if (verseSound && isPlayingVerse) {
            await verseSound.stopAsync();
            setIsPlayingVerse(false);
          }

          // Load and play reflection audio
          if (!reflectionSound) {
            const { sound } = await Audio.Sound.createAsync(
              { uri: currentVerse.reflection.audioUrl },
              { shouldPlay: true }
            );
            setReflectionSound(sound);
            setIsPlayingReflection(true);

            // Set up playback status listener
            sound.setOnPlaybackStatusUpdate((status) => {
              if (status.isLoaded && status.didJustFinish) {
                setIsPlayingReflection(false);
              }
            });
          } else {
            await reflectionSound.replayAsync();
            setIsPlayingReflection(true);
          }
        }
      } catch (error) {
        console.error('Error playing reflection audio:', error);
        setIsPlayingReflection(false);
      }
    }
  };

  const stopAllAudio = async () => {
    try {
      if (verseSound && isPlayingVerse) {
        await verseSound.stopAsync();
        setIsPlayingVerse(false);
      }
      if (reflectionSound && isPlayingReflection) {
        await reflectionSound.stopAsync();
        setIsPlayingReflection(false);
      }
    } catch (error) {
      console.error('Error stopping audio:', error);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom + 100 }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header with Custom Image */}
        <View style={styles.header}>
          <Image source={currentVerse.headerImage} style={styles.headerImage} />
          <View style={styles.headerOverlay}>
            <TouchableOpacity style={styles.menuButton} onPress={() => setShowMenu(true)}>
              <Menu color="#FFFFFF" size={24} strokeWidth={2.5} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Daily</Text>
            <Text style={styles.headerSubtitle}>Challenges</Text>
          </View>
        </View>

        {/* Date and Timezone Display */}
        <View style={styles.dateTimeContainer}>
          <View style={styles.dateTimeInfo}>
            <Clock color="#8B4513" size={16} />
            <Text style={styles.dateTimeText}>
              {formatDateTime(currentDate, userTimezone)}
            </Text>
          </View>
          <TouchableOpacity style={styles.timezoneButton} onPress={handleTimezoneChange}>
            <Globe color="#8B4513" size={16} />
            <Text style={styles.timezoneText}>{userTimezone.split('/')[1]?.replace('_', ' ') || userTimezone}</Text>
            <Settings color="#8B4513" size={14} />
          </TouchableOpacity>
        </View>

        {/* Audio Controls Bar */}
        <View style={styles.audioControlsBar}>
          <TouchableOpacity 
            style={[styles.audioToggle, !audioEnabled && styles.audioDisabled]}
            onPress={() => {
              setAudioEnabled(!audioEnabled);
              if (!audioEnabled) stopAllAudio();
            }}
          >
            {audioEnabled ? (
              <Volume2 color="#FFFFFF" size={20} strokeWidth={2.5} />
            ) : (
              <VolumeX color="#FFFFFF" size={20} strokeWidth={2.5} />
            )}
            <Text style={styles.audioToggleText}>
              {audioEnabled ? 'Audio On' : 'Audio Off'}
            </Text>
          </TouchableOpacity>

          {(isPlayingVerse || isPlayingReflection) && (
            <TouchableOpacity style={styles.stopButton} onPress={stopAllAudio}>
              <RotateCcw color="#FFFFFF" size={16} strokeWidth={2.5} />
              <Text style={styles.stopButtonText}>Stop All</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Challenge Title */}
        <View style={styles.challengeHeader}>
          <Text style={styles.challengeTitle}>{currentVerse.date} Challenge</Text>
        </View>

        {/* Daily Verse Card */}
        <View style={styles.verseCard}>
          <View style={styles.verseHeader}>
            <Text style={styles.verseReference}>
              {language === 'english' 
                ? currentVerse.verse.english.reference 
                : currentVerse.verse.tagalog.reference}
            </Text>
            <View style={styles.verseActions}>
              <TouchableOpacity 
                style={styles.languageButton}
                onPress={() => setLanguage(language === 'english' ? 'tagalog' : 'english')}
              >
                <Text style={styles.languageButtonText}>
                  {language === 'english' ? 'TAG' : 'ENG'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.actionButton, isFavorited && styles.favorited]}
                onPress={() => setIsFavorited(!isFavorited)}
              >
                <Heart 
                  color={isFavorited ? "#FFFFFF" : "#8B4513"} 
                  size={18} 
                  fill={isFavorited ? "#FFFFFF" : "none"}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Share color="#8B4513" size={18} />
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.verseText}>
            {language === 'english' 
              ? currentVerse.verse.english.text 
              : currentVerse.verse.tagalog.text}
          </Text>
          
          <TouchableOpacity 
            style={[styles.playButton, isPlayingVerse && styles.playingButton]}
            onPress={toggleVerseAudio}
            disabled={!audioEnabled}
          >
            {isPlayingVerse ? (
              <Pause color="#FFFFFF" size={20} strokeWidth={2.5} />
            ) : (
              <Play color="#FFFFFF" size={20} strokeWidth={2.5} />
            )}
            <Text style={styles.playButtonText}>
              {isPlayingVerse 
                ? (language === 'english' ? 'Pause Verse' : 'Ihinto ang Talata')
                : (language === 'english' ? 'Listen to Verse' : 'Pakinggan ang Talata')}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Reflection Section */}
        <View style={styles.reflectionCard}>
          <Text style={styles.reflectionTitle}>
            {language === 'english' 
              ? currentVerse.reflection.english.title 
              : currentVerse.reflection.tagalog.title}
          </Text>
          <Text style={styles.reflectionText}>
            {language === 'english' 
              ? currentVerse.reflection.english.text 
              : currentVerse.reflection.tagalog.text}
          </Text>
          
          <TouchableOpacity 
            style={[styles.playButton, styles.reflectionPlayButton, isPlayingReflection && styles.playingButton]}
            onPress={toggleReflectionAudio}
            disabled={!audioEnabled}
          >
            {isPlayingReflection ? (
              <Pause color="#FFFFFF" size={20} strokeWidth={2.5} />
            ) : (
              <Play color="#FFFFFF" size={20} strokeWidth={2.5} />
            )}
            <Text style={styles.playButtonText}>
              {isPlayingReflection 
                ? (language === 'english' ? 'Pause Reflection' : 'Ihinto ang Pagninilay')
                : (language === 'english' ? 'Listen to Reflection' : 'Pakinggan ang Pagninilay')}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Weekly Progress */}
        <View style={styles.weeklyContainer}>
          <Text style={styles.weeklyTitle}>This Week's Progress</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.weeklyScroll}>
            {getWeekDates(currentDate).map((date, index) => {
              const isToday = date.toDateString() === currentDate.toDateString();
              const isViewed = weeklyProgress[date.toDateString()];
              const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
              
              return (
                <TouchableOpacity 
                  key={date.toDateString()} 
                  style={[styles.dayCard, isToday && styles.activeDayCard]}
                  onPress={() => {
                    if (!isViewed) {
                      setWeeklyProgress(prev => ({
                        ...prev,
                        [date.toDateString()]: true
                      }));
                    }
                  }}
                >
                  <Text style={[styles.dayName, isToday && styles.activeDayName]}>
                    {dayNames[index]}
                  </Text>
                  <View style={[styles.dayCircle, isToday && styles.activeDayCircle]}>
                    {isViewed ? (
                      <Text style={styles.checkMark}>✓</Text>
                    ) : isToday ? (
                      <Text style={styles.currentDay}>•</Text>
                    ) : (
                      <Text style={styles.dayNumber}>{date.getDate()}</Text>
                    )}
                  </View>
                  <Text style={[styles.dayDate, isToday && styles.activeDayDate]}>
                    {date.getDate()}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Prayer Corner */}
        <View style={styles.prayerCorner}>
          <Text style={styles.prayerTitle}>
            🙏 {language === 'english' ? 'Prayer Corner' : 'Sulok ng Panalangin'}
          </Text>
          <Text style={styles.prayerText}>
            {language === 'english' 
              ? '"Dear God, thank you for being close to us always. Help us to remember that we can talk to you anytime, anywhere. Fill our hearts with your love and peace. Amen."'
              : '"Mahal na Diyos, salamat sa pagiging malapit Mo sa amin palagi. Tulungan Mo kaming maalala na makakausap namin Kayo kahit kailan, kahit saan. Punuin Mo ang aming mga puso ng Inyong pagmamahal at kapayapaan. Amen."'}
          </Text>
          <TouchableOpacity style={styles.prayerButton}>
            <Text style={styles.prayerButtonText}>
              {language === 'english' ? 'Say a Prayer' : 'Manalangin'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <HamburgerMenu
        visible={showMenu}
        onClose={() => setShowMenu(false)}
        onThemes={handleThemes}
        onRewards={handleRewards}
        onCompleted={handleCompleted}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8DC',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    height: 200,
    position: 'relative',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
    marginBottom: 10,
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(139, 69, 19, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  menuButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 50,
    padding: 12,
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 20,
    color: '#F7D154',
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  dateTimeContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 15,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dateTimeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  dateTimeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8B4513',
    marginLeft: 6,
    textAlign: 'center',
  },
  timezoneButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7D154',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'center',
  },
  timezoneText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8B4513',
    marginHorizontal: 6,
  },
  audioControlsBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  audioToggle: {
    backgroundColor: '#50C878',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  audioDisabled: {
    backgroundColor: '#FF6B6B',
  },
  audioToggleText: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 6,
    fontSize: 14,
  },
  stopButton: {
    backgroundColor: '#FF8C42',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  stopButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 4,
    fontSize: 12,
  },
  challengeHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  challengeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#8B4513',
    textAlign: 'center',
  },
  verseCard: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  verseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  verseReference: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8B4513',
  },
  verseActions: {
    flexDirection: 'row',
    gap: 8,
  },
  languageButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 12,
    minWidth: 40,
    alignItems: 'center',
  },
  languageButtonText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  actionButton: {
    backgroundColor: '#F7D154',
    padding: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  favorited: {
    backgroundColor: '#FF6B9D',
  },
  verseText: {
    fontSize: 18,
    color: '#5D4037',
    lineHeight: 28,
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 20,
    fontWeight: '500',
  },
  playButton: {
    backgroundColor: '#FF8C42',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  playingButton: {
    backgroundColor: '#E67E22',
  },
  reflectionPlayButton: {
    backgroundColor: '#8FBC8F',
    marginTop: 16,
  },
  playButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    marginLeft: 8,
    fontSize: 16,
  },
  coloringSection: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 16,
    textAlign: 'center',
  },
  coloringCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  coloringImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  coloringOverlay: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  coloringBadge: {
    backgroundColor: 'rgba(247, 209, 84, 0.95)',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  coloringBadgeText: {
    color: '#8B4513',
    fontSize: 12,
    fontWeight: 'bold',
  },
  coloringContent: {
    padding: 16,
  },
  coloringTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 8,
    textAlign: 'center',
  },
  coloringDescription: {
    fontSize: 14,
    color: '#D2691E',
    textAlign: 'center',
    lineHeight: 20,
  },
  reflectionCard: {
    backgroundColor: '#8FBC8F',
    margin: 16,
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  reflectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center',
  },
  reflectionText: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 24,
    textAlign: 'center',
    fontWeight: '500',
  },
  weeklyContainer: {
    margin: 16,
    marginTop: 8,
  },
  weeklyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 16,
    textAlign: 'center',
  },
  weeklyScroll: {
    paddingVertical: 8,
  },
  dayCard: {
    alignItems: 'center',
    marginHorizontal: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    minWidth: 60,
  },
  activeDayCard: {
    backgroundColor: '#F7D154',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  dayName: {
    fontSize: 12,
    color: '#D2691E',
    fontWeight: '600',
    marginBottom: 8,
  },
  activeDayName: {
    color: '#8B4513',
  },
  dayCircle: {
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  activeDayCircle: {
    backgroundColor: '#FF8C42',
  },
  checkMark: {
    fontSize: 16,
    color: '#50C878',
    fontWeight: 'bold',
  },
  currentDay: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  dayNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#8B4513',
  },
  dayDate: {
    fontSize: 10,
    color: '#D2691E',
    fontWeight: '500',
  },
  activeDayDate: {
    color: '#8B4513',
  },
  prayerCorner: {
    backgroundColor: '#DDA0DD',
    margin: 16,
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  prayerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  prayerText: {
    fontSize: 15,
    color: '#FFFFFF',
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 22,
    marginBottom: 16,
  },
  prayerButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
  prayerButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
});