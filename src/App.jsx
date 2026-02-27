import { useState } from "react";

// ─── SHARED UI COMPONENTS ───────────────────────────────────────────────────

const Card = ({ title, children, color = "indigo" }) => {
  const border = { indigo:"border-indigo-500/40 bg-indigo-950/30", green:"border-green-500/40 bg-green-950/30", yellow:"border-yellow-500/40 bg-yellow-950/30", red:"border-red-500/40 bg-red-950/30", blue:"border-blue-500/40 bg-blue-950/30", purple:"border-purple-500/40 bg-purple-950/30", orange:"border-orange-500/40 bg-orange-950/30", teal:"border-teal-500/40 bg-teal-950/30", cyan:"border-cyan-500/40 bg-cyan-950/30", pink:"border-pink-500/40 bg-pink-950/30" };
  const title_c = { indigo:"text-indigo-300", green:"text-green-300", yellow:"text-yellow-300", red:"text-red-300", blue:"text-blue-300", purple:"text-purple-300", orange:"text-orange-300", teal:"text-teal-300", cyan:"text-cyan-300", pink:"text-pink-300" };
  return (
    <div className={`rounded-xl border ${border[color]} p-4 mb-4`}>
      {title && <h3 className={`font-bold text-xs mb-3 uppercase tracking-widest ${title_c[color]}`}>{title}</h3>}
      {children}
    </div>
  );
};

const Badge = ({ text, color = "gray" }) => {
  const c = { gray:"bg-gray-700 text-gray-200", green:"bg-green-800 text-green-200", blue:"bg-blue-800 text-blue-200", red:"bg-red-800 text-red-200", yellow:"bg-yellow-800 text-yellow-200", purple:"bg-purple-800 text-purple-200", orange:"bg-orange-800 text-orange-200", teal:"bg-teal-800 text-teal-200", pink:"bg-pink-800 text-pink-200" };
  return <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${c[color]}`}>{text}</span>;
};

const Table = ({ headers, rows }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-xs rounded-lg overflow-hidden">
      <thead><tr className="bg-gray-700/80 text-gray-200">{headers.map((h,i)=><th key={i} className="px-3 py-2 text-left font-semibold">{h}</th>)}</tr></thead>
      <tbody>{rows.map((row,i)=><tr key={i} className={i%2===0?"bg-gray-800/50":"bg-gray-800/20"}>{row.map((cell,j)=><td key={j} className="px-3 py-2 text-gray-300">{cell}</td>)}</tr>)}</tbody>
    </table>
  </div>
);

const LifecycleFlow = ({ steps, colors }) => (
  <div className="flex flex-col items-center gap-0.5 my-2">
    {steps.map((s,i)=>(
      <div key={i} className="flex flex-col items-center w-full">
        <div className={`rounded-lg px-4 py-2 text-xs font-mono font-bold ${colors[i%colors.length]} text-white shadow w-full max-w-xs text-center`}>{s.name}</div>
        {s.note && <div className="text-xs text-gray-400 italic mt-0.5 mb-0.5 text-center max-w-xs px-2">{s.note}</div>}
        {i<steps.length-1 && <div className="text-gray-600 text-base leading-none">↓</div>}
      </div>
    ))}
  </div>
);

const ConnectsTo = ({ items }) => (
  <div className="mt-3 pt-3 border-t border-gray-700/50">
    <div className="text-xs text-gray-500 mb-1.5 uppercase tracking-wider">🔗 Connects to</div>
    <div className="flex flex-wrap gap-1.5">{items.map((item,i)=><span key={i} className="text-xs bg-gray-700/60 text-gray-300 px-2 py-0.5 rounded-full border border-gray-600/40">{item}</span>)}</div>
  </div>
);

const Callout = ({ type="tip", children }) => {
  const styles = { tip:"border-blue-500/40 bg-blue-950/20 text-blue-200", warn:"border-yellow-500/40 bg-yellow-950/20 text-yellow-200", danger:"border-red-500/40 bg-red-950/20 text-red-200", good:"border-green-500/40 bg-green-950/20 text-green-200" };
  const icons = { tip:"💡", warn:"⚠️", danger:"🚨", good:"✅" };
  return <div className={`rounded-lg border px-3 py-2 text-xs mt-2 ${styles[type]}`}>{icons[type]} {children}</div>;
};

const CodeBlock = ({ code }) => (
  <div className="bg-gray-900/80 rounded-lg p-3 font-mono text-xs text-green-300 border border-gray-700/40 overflow-x-auto mt-2">
    <pre className="whitespace-pre-wrap">{code}</pre>
  </div>
);

// ─── PART 1 SECTIONS ────────────────────────────────────────────────────────

const part1Sections = [
  {
    id:"architecture", label:"🏗️ Architecture",
    content: () => (
      <div>
        <p className="text-gray-400 text-xs mb-4">Before writing a single line of Android code, understand the layered system your code runs inside. Every concept in Parts 1–8 builds on this foundation.</p>
        <Card title="The App Stack — Top to Bottom" color="indigo">
          <div className="space-y-1.5">
            {[
              { layer:"Your App Code", desc:"Activities, Fragments, ViewModels, Repositories", icon:"🏠", bg:"bg-indigo-800/70" },
              { layer:"Application Class", desc:"First thing instantiated when your process starts. Sets up global state, DI graphs, analytics SDKs.", icon:"🧬", bg:"bg-blue-800/70" },
              { layer:"Context", desc:"Your app's passport to the Android system — access resources, databases, preferences, and system services.", icon:"🔑", bg:"bg-cyan-800/70" },
              { layer:"Android Framework", desc:"Activity Manager, Window Manager, Content Providers, Notification Manager…", icon:"⚙️", bg:"bg-teal-800/70" },
              { layer:"Linux Kernel", desc:"Memory management, process isolation, hardware drivers. Each app runs in its own process sandbox.", icon:"🐧", bg:"bg-gray-700/70" },
            ].map((l,i)=>(
              <div key={i} className={`${l.bg} rounded-lg px-4 py-2.5 flex items-center gap-3`}>
                <span className="text-xl">{l.icon}</span>
                <div><div className="text-white font-semibold text-sm">{l.layer}</div><div className="text-gray-300 text-xs mt-0.5">{l.desc}</div></div>
              </div>
            ))}
          </div>
          <ConnectsTo items={["Application Class → Part 1: Services","Context → Part 1: Activities & Fragments","Architecture Components → Part 2"]} />
        </Card>
        <Card title="Context: Two Flavors" color="blue">
          <Table headers={["Type","Tied To","Use When","Avoid When"]} rows={[
            ["Application Context","App lifecycle","Singletons, DI setup, app-wide resources","Showing dialogs, inflating views"],
            ["Activity Context","Activity lifecycle","UI ops, dialogs, layouts, views","Long-lived objects (causes leaks!)"],
          ]} />
          <Callout type="danger">Holding an Activity Context in a static field or singleton = memory leak. The Activity can't be GC'd even after it's destroyed.</Callout>
          <ConnectsTo items={["Memory Leaks → Part 2: Expert concepts","ViewModel avoids needing Activity context"]} />
        </Card>
      </div>
    )
  },
  {
    id:"components", label:"🧱 4 Components",
    content: () => (
      <div>
        <p className="text-gray-400 text-xs mb-4">Every Android app is composed of exactly these 4 building blocks. Declared in <span className="text-yellow-300 font-mono">AndroidManifest.xml</span> — if it's not there, Android doesn't know it exists.</p>
        <div className="space-y-3 mb-4">
          {[
            { icon:"📱", name:"Activity", color:"bg-indigo-800/70", border:"border-indigo-500/30", desc:"A single screen with a user interface. Entry point for user interaction.", analogy:"A page in a book", note:"Most apps have multiple. One is the launcher entry point." },
            { icon:"⚙️", name:"Service", color:"bg-green-800/70", border:"border-green-500/30", desc:"Background work with no UI — music, downloads, data sync.", analogy:"A worker in a back room", note:"Doesn't die when user navigates away." },
            { icon:"📡", name:"Broadcast Receiver", color:"bg-yellow-800/70", border:"border-yellow-500/30", desc:"Listens for system-wide events: battery low, network change, boot.", analogy:"A smoke detector", note:"Keep it minimal — delegate heavy work to Service/WorkManager." },
            { icon:"🗄️", name:"Content Provider", color:"bg-purple-800/70", border:"border-purple-500/30", desc:"Structured data sharing between apps. Powers Contacts, MediaStore.", analogy:"A shared database with a security guard", note:"Access via ContentResolver, not directly." },
          ].map((c,i)=>(
            <div key={i} className={`${c.color} border ${c.border} rounded-xl p-3`}>
              <div className="flex gap-3 items-start">
                <span className="text-3xl">{c.icon}</span>
                <div className="flex-1">
                  <div className="font-bold text-white text-sm">{c.name}</div>
                  <div className="text-gray-200 text-xs mt-0.5">{c.desc}</div>
                  <div className="flex gap-2 mt-1.5 flex-wrap">
                    <span className="text-gray-400 text-xs italic">"{c.analogy}"</span>
                    <span className="text-gray-300 text-xs">→ {c.note}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Callout type="tip">All 4 components are declared in AndroidManifest.xml. The system reads this before launch to understand what your app can do.</Callout>
      </div>
    )
  },
  {
    id:"activity", label:"📱 Activity",
    content: () => (
      <div>
        <p className="text-gray-400 text-xs mb-4">Activity is the most critical component to master. Its lifecycle drives nearly every UI decision you make — and connects directly to ViewModel and Fragment (Part 2).</p>
        <Card title="Activity Lifecycle" color="indigo">
          <div className="flex gap-4">
            <div className="flex-1">
              <LifecycleFlow steps={[
                { name:"onCreate()", note:"Setup UI, init ViewModel. Runs once per instance." },
                { name:"onStart()", note:"Visible but not interactive." },
                { name:"onResume()", note:"🟢 Foreground. User can interact." },
                { name:"onPause()", note:"Partially obscured. Save lightweight state." },
                { name:"onStop()", note:"Fully hidden. Release heavy resources." },
                { name:"onDestroy()", note:"Being killed. Final cleanup." },
              ]} colors={["bg-indigo-600","bg-blue-600","bg-green-600","bg-yellow-600","bg-orange-600","bg-red-700"]} />
            </div>
            <div className="w-px bg-gray-700/60 mx-1"/>
            <div className="flex-1 flex flex-col gap-2 justify-center text-xs">
              <div className="bg-gray-800/60 rounded p-2 border border-gray-700/40"><span className="text-green-400 font-bold font-mono">onRestart()</span><div className="text-gray-400 mt-0.5">Between onStop → onStart when user returns.</div></div>
              <div className="bg-gray-800/60 rounded p-2 border border-gray-700/40"><span className="text-yellow-400 font-bold font-mono">onSaveInstanceState()</span><div className="text-gray-400 mt-0.5">Save UI state before pause. Bundle survives process death.</div></div>
              <div className="bg-gray-800/60 rounded p-2 border border-gray-700/40"><span className="text-blue-400 font-bold font-mono">onRestoreInstanceState()</span><div className="text-gray-400 mt-0.5">Only called on recreation, not fresh start.</div></div>
              <Callout type="warn">Screen rotation → onDestroy + onCreate. Use ViewModel to survive this — it's the whole point of ViewModel (Part 2).</Callout>
            </div>
          </div>
          <ConnectsTo items={["ViewModel survives rotation → Part 2","SavedStateHandle for process death → Part 2","Fragment shares Activity lifecycle"]} />
        </Card>
        <Card title="Launch Modes" color="purple">
          <Table headers={["Mode","New instance?","Stack behavior","Best for"]} rows={[
            ["standard","Always","Stacks on top every time","Most activities (default)"],
            ["singleTop","Only if not on top","Reuses top → onNewIntent()","Search, notifications"],
            ["singleTask","Only if not in task","Clears everything above","Home/main activity"],
            ["singleInstance","Always in own task","Completely isolated","Launcher, dialer"],
          ]} />
        </Card>
        <Card title="Clearing the Back Stack" color="yellow">
          <Table headers={["Flag","What it does","Pair with"]} rows={[
            ["FLAG_ACTIVITY_CLEAR_TOP","Clears everything above existing instance","FLAG_ACTIVITY_NEW_TASK (optional)"],
            ["FLAG_ACTIVITY_CLEAR_TASK","Wipes entire task","FLAG_ACTIVITY_NEW_TASK (required)"],
          ]} />
        </Card>
      </div>
    )
  },
  {
    id:"fragment", label:"🧩 Fragment",
    content: () => (
      <div>
        <p className="text-gray-400 text-xs mb-4">Fragments are modular UI pieces that live inside Activities. Modern Android development (Navigation Component, Part 2) is almost entirely fragment-based.</p>
        <Card title="Activity vs Fragment" color="green">
          <Table headers={["","Activity","Fragment"]} rows={[
            ["Lives independently?","✅ Yes","❌ Must be hosted by Activity"],
            ["Lifecycle owner","Android system","Host Activity"],
            ["Reusable across screens?","❌ Not really","✅ Core purpose"],
            ["Added/removed at runtime?","❌ Complex","✅ FragmentManager handles it"],
          ]} />
          <ConnectsTo items={["Navigation Component manages fragments → Part 2","ViewModel shared between Fragment+Activity → Part 2"]} />
        </Card>
        <Card title="Fragment Lifecycle" color="blue">
          <LifecycleFlow steps={[
            { name:"onAttach()", note:"Gets reference to host Activity." },
            { name:"onCreate()", note:"Init non-UI data. Don't touch views yet." },
            { name:"onCreateView()", note:"Inflate and return your layout." },
            { name:"onActivityCreated()", note:"Activity fully ready. Safe to use views." },
            { name:"onStart() → onResume()", note:"🟢 Visible and interactive." },
            { name:"onPause() → onStop()", note:"Losing focus/visibility." },
            { name:"onDestroyView()", note:"View gone — null out binding references here!" },
            { name:"onDestroy() → onDetach()", note:"Fragment cleanup and disconnects." },
          ]} colors={["bg-teal-700","bg-cyan-700","bg-blue-600","bg-indigo-600","bg-green-600","bg-yellow-600","bg-orange-600","bg-red-700"]} />
          <Callout type="danger">Never store view references beyond onDestroyView(). The view is gone but the Fragment instance may still be alive — this causes leaks.</Callout>
        </Card>
        <Card title="add() vs replace()" color="orange">
          <Table headers={["","add()","replace()"]} rows={[
            ["Previous fragment","Stays alive (not paused)","Destroyed"],
            ["Back press","Reappears instantly","Recreated fresh"],
            ["Memory","Higher (both in memory)","Lower (current only)"],
            ["Use when","Overlapping UI, tabs","Full screen swap"],
          ]} />
          <Callout type="tip">Navigation Component (Part 2) handles all of this for you automatically — you rarely touch FragmentManager directly in modern Android.</Callout>
        </Card>
      </div>
    )
  },
  {
    id:"services", label:"⚙️ Services",
    content: () => (
      <div>
        <p className="text-gray-400 text-xs mb-4">Services handle work that continues regardless of UI state. WorkManager (Part 2) is now the recommended way to handle most background work.</p>
        <Card title="3 Types of Services" color="green">
          <div className="space-y-2">
            {[
              { name:"Foreground Service", icon:"🔔", color:"bg-green-800/70", border:"border-green-500/30", desc:"User-visible via persistent notification. High priority.", ex:"Music player, GPS navigation" },
              { name:"Background Service", icon:"🌑", color:"bg-gray-700/70", border:"border-gray-500/30", desc:"Invisible. Restricted since Android 8.0. Use WorkManager instead.", ex:"Legacy data sync" },
              { name:"Bound Service", icon:"🔗", color:"bg-blue-800/70", border:"border-blue-500/30", desc:"Components bind via IBinder for two-way communication.", ex:"Bluetooth, real-time data feed" },
            ].map((s,i)=>(
              <div key={i} className={`${s.color} border ${s.border} rounded-lg p-3`}>
                <div className="flex items-center gap-2 mb-1"><span>{s.icon}</span><span className="font-bold text-white text-sm">{s.name}</span></div>
                <div className="text-gray-200 text-xs">{s.desc}</div>
                <div className="text-gray-400 text-xs mt-1">e.g. {s.ex}</div>
              </div>
            ))}
          </div>
          <ConnectsTo items={["WorkManager is the modern replacement → Part 2","JobScheduler → Part 2"]} />
        </Card>
        <Card title="Service vs IntentService vs JobIntentService" color="blue">
          <Table headers={["","Service","IntentService","JobIntentService"]} rows={[
            ["Thread","Main (UI) ⚠️","Worker ✅","Worker ✅"],
            ["Auto-stops?","No","Yes","Yes"],
            ["Survives Oreo+?","Partly","No","Yes"],
            ["Modern replacement","—","WorkManager","WorkManager"],
          ]} />
          <Callout type="warn">IntentService is deprecated in API 30. Use WorkManager for all background tasks.</Callout>
        </Card>
      </div>
    )
  },
  {
    id:"intents", label:"📨 Intents",
    content: () => (
      <div>
        <p className="text-gray-400 text-xs mb-4">Intents are Android's messaging system — how components talk to each other within your app and across apps.</p>
        <Card title="Explicit vs Implicit" color="indigo">
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="bg-indigo-900/50 rounded-lg p-3 text-xs border border-indigo-500/30">
              <div className="text-indigo-300 font-bold mb-1">Explicit Intent</div>
              <div className="text-gray-300">Name the exact target. Within your own app.</div>
              <CodeBlock code={`Intent(this,\n  DetailActivity::class.java)`} />
            </div>
            <div className="bg-blue-900/50 rounded-lg p-3 text-xs border border-blue-500/30">
              <div className="text-blue-300 font-bold mb-1">Implicit Intent</div>
              <div className="text-gray-300">Declare an action. Android finds the right app.</div>
              <CodeBlock code={`Intent(ACTION_SEND).apply {\n  type = "text/plain"\n}`} />
            </div>
          </div>
          <ConnectsTo items={["Safe Args replaces manual intent extras → Part 2","Deep Linking uses implicit intents → Part 2","PendingIntent → Notifications, AlarmManager"]} />
        </Card>
        <Card title="3 Intent Flavors" color="green">
          <Table headers={["Type","What it is","Use case"]} rows={[
            ["Regular","Fire-and-forget","Start activity, launch service"],
            ["Sticky","Persists in system after broadcast","Legacy — use LiveData/StateFlow instead"],
            ["Pending","Deferred, executed by another component","Notifications, AlarmManager, Geofences"],
          ]} />
        </Card>
        <Card title="Intent Filters" color="yellow">
          <p className="text-xs text-gray-400 mb-2">Tells the system what implicit intents your component can handle. Declared in AndroidManifest.xml.</p>
          <CodeBlock code={`<intent-filter>\n  <action android:name="android.intent.action.VIEW" />\n  <category android:name="android.intent.category.DEFAULT" />\n  <data android:scheme="https" />\n</intent-filter>`} />
          <p className="text-xs text-gray-400 mt-2">↑ Makes your Activity respond to any https:// link tap.</p>
        </Card>
      </div>
    )
  },
  {
    id:"misc", label:"🔧 Misc",
    content: () => (
      <div>
        <p className="text-gray-400 text-xs mb-4">These concepts round out Android basics. They appear frequently in interviews and connect directly to the Architecture Components in Part 2.</p>
        <Card title="Content Provider" color="purple">
          <div className="flex items-center gap-2 text-xs text-gray-300 mb-3 flex-wrap">
            <div className="bg-purple-800/60 rounded p-2 text-center border border-purple-500/30"><div className="font-bold text-white">App A</div><div className="text-gray-400">(owns data)</div></div>
            <div className="text-gray-500">→ ContentProvider →</div>
            <div className="bg-gray-700/60 rounded p-2 border border-gray-600/30 text-purple-300 font-mono">ContentResolver.query(URI)</div>
            <div className="text-gray-500">→</div>
            <div className="bg-blue-800/60 rounded p-2 border border-blue-500/30"><div className="font-bold text-white">App B</div><div className="text-gray-400">(reads data)</div></div>
          </div>
          <ConnectsTo items={["Room DB can be exposed via ContentProvider → Part 2","FileProvider shares files securely"]} />
        </Card>
        <Card title="Broadcast Receivers" color="yellow">
          <Table headers={["","Static (Manifest)","Dynamic (Code)"]} rows={[
            ["When active","Even if app not running","Only while app is alive"],
            ["Unregister needed?","No","Yes — in onStop/onDestroy"],
            ["Post-Oreo restrictions","Many implicit broadcasts blocked","Works fine"],
          ]} />
          <Callout type="warn">BroadcastReceiver runs on the main thread with a strict time limit. Delegate heavy work to WorkManager.</Callout>
        </Card>
        <Card title="onTrimMemory()" color="red">
          <p className="text-xs text-gray-400 mb-2">Android calls this when it needs memory back. Release caches and non-critical resources to avoid being killed.</p>
          <div className="space-y-1 text-xs">
            {[
              { level:"RUNNING_MODERATE", color:"text-green-400", desc:"Moderate pressure — start being aware" },
              { level:"RUNNING_LOW", color:"text-yellow-400", desc:"Low memory — start releasing" },
              { level:"RUNNING_CRITICAL", color:"text-orange-400", desc:"Release everything or get killed" },
              { level:"BACKGROUND", color:"text-red-400", desc:"App in background — release to survive" },
            ].map((l,i)=><div key={i} className="flex gap-2"><span className={`${l.color} font-mono font-bold w-44 shrink-0`}>{l.level}</span><span className="text-gray-400">{l.desc}</span></div>)}
          </div>
        </Card>
      </div>
    )
  }
];

// ─── PART 2 SECTIONS ────────────────────────────────────────────────────────

const part2Sections = [
  {
    id:"arch-components", label:"🏛️ Arch Components",
    content: () => (
      <div>
        <p className="text-gray-400 text-xs mb-4">Android Architecture Components are Google's answer to the chaos of managing UI state, data, and lifecycle manually. They form the backbone of every modern Android app.</p>
        <Card title="Why Architecture Components?" color="indigo">
          <div className="grid grid-cols-2 gap-2 text-xs mb-2">
            {[
              { icon:"🔄", title:"Lifecycle Awareness", desc:"Components auto-manage themselves based on Activity/Fragment state. No manual cleanup." },
              { icon:"💾", title:"Data Consistency", desc:"ViewModel + LiveData keep UI in sync through rotations without re-fetching." },
              { icon:"🧪", title:"Testability", desc:"Modular structure makes unit testing each layer straightforward." },
              { icon:"📐", title:"MVVM Natural Fit", desc:"These components are designed around Model-View-ViewModel architecture." },
            ].map((item,i)=>(
              <div key={i} className="bg-gray-800/50 rounded-lg p-2.5 border border-gray-700/30">
                <div className="text-lg mb-1">{item.icon}</div>
                <div className="text-indigo-300 font-bold">{item.title}</div>
                <div className="text-gray-400 mt-0.5">{item.desc}</div>
              </div>
            ))}
          </div>
          <ConnectsTo items={["ViewModel → next section","LiveData → next sections","Room → Part 2: Room section","WorkManager → Part 2: WorkManager section"]} />
        </Card>
        <Card title="The MVVM Architecture — How It All Fits" color="blue">
          <div className="space-y-1.5 text-xs">
            {[
              { layer:"View (Activity/Fragment)", desc:"Observes LiveData/StateFlow. Updates UI. Sends user actions to ViewModel.", color:"bg-indigo-800/60", arrow:"↕ observe / send events" },
              { layer:"ViewModel", desc:"Holds UI state. Calls Repository. Survives configuration changes. No View/Context references.", color:"bg-blue-800/60", arrow:"↕ exposes data / calls methods" },
              { layer:"Repository", desc:"Single source of truth. Decides: use cache (Room) or fetch fresh (Network)?", color:"bg-teal-800/60", arrow:"↕ reads/writes data" },
              { layer:"Data Sources (Room + Network)", desc:"Room for local persistence. Retrofit/API for remote. Repository abstracts the difference.", color:"bg-gray-700/60", arrow:"" },
            ].map((l,i)=>(
              <div key={i}>
                <div className={`${l.color} rounded-lg px-3 py-2`}>
                  <div className="text-white font-semibold">{l.layer}</div>
                  <div className="text-gray-300 mt-0.5">{l.desc}</div>
                </div>
                {l.arrow && <div className="text-center text-gray-600 text-xs py-0.5">{l.arrow}</div>}
              </div>
            ))}
          </div>
          <Callout type="tip">Repository is a pattern, not a library. It's the glue between ViewModel and your data sources.</Callout>
        </Card>
        <Card title="LifecycleOwner — The Glue" color="teal">
          <p className="text-xs text-gray-300 mb-2">A <span className="text-teal-300 font-mono">LifecycleOwner</span> is anything with a defined lifecycle — Activity, Fragment, even custom classes. It's the contract that lifecycle-aware components (LiveData, ViewModel) use to know when to start/stop observing.</p>
          <Table headers={["Who is a LifecycleOwner?","What it enables"]} rows={[
            ["Activity","LiveData auto-stops emitting when Activity is stopped"],
            ["Fragment","Observers auto-removed on fragment destruction"],
            ["LifecycleService","Services that are lifecycle-aware"],
            ["Custom classes","Implement LifecycleOwner to get the same benefits"],
          ]} />
          <Callout type="good">The lifecycle system is what prevents 90% of the crashes and leaks that plagued older Android code.</Callout>
        </Card>
      </div>
    )
  },
  {
    id:"viewmodel", label:"🧠 ViewModel",
    content: () => (
      <div>
        <p className="text-gray-400 text-xs mb-4">ViewModel is possibly the single most important architecture component. It solves the rotation problem and keeps your UI layer clean. Everything in Part 2 revolves around it.</p>
        <Card title="What Problem Does ViewModel Solve?" color="indigo">
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-red-900/40 rounded-lg p-3 border border-red-500/30">
              <div className="text-red-300 font-bold mb-1">❌ Without ViewModel</div>
              <div className="text-gray-300">User rotates screen → Activity destroyed → data lost → re-fetch from network → bad UX + wasted calls</div>
            </div>
            <div className="bg-green-900/40 rounded-lg p-3 border border-green-500/30">
              <div className="text-green-300 font-bold mb-1">✅ With ViewModel</div>
              <div className="text-gray-300">User rotates screen → new Activity attaches to same ViewModel instance → data already there → instant UI restore</div>
            </div>
          </div>
          <ConnectsTo items={["Activity Lifecycle → Part 1","LiveData exposed from ViewModel → next section","SavedStateHandle for process death"]} />
        </Card>
        <Card title="ViewModel Lifecycle vs Activity Lifecycle" color="blue">
          <p className="text-xs text-gray-400 mb-2">The ViewModel outlives configuration changes. It's only cleared when the Activity is <em>truly</em> finished (user presses back).</p>
          <div className="space-y-1 text-xs">
            {[
              { event:"Activity created (first time)", vm:"ViewModel created", c:"text-green-400" },
              { event:"Screen rotated (config change)", vm:"Same ViewModel instance reused ✅", c:"text-green-400" },
              { event:"Activity re-created after rotation", vm:"ViewModel still alive", c:"text-green-400" },
              { event:"User presses back / finishActivity()", vm:"ViewModel.onCleared() called + destroyed", c:"text-red-400" },
              { event:"Process killed (low memory)", vm:"ViewModel lost ⚠️ — use SavedStateHandle", c:"text-yellow-400" },
            ].map((r,i)=>(
              <div key={i} className="flex gap-3 bg-gray-800/40 rounded px-2 py-1.5">
                <span className="text-gray-400 flex-1">{r.event}</span>
                <span className={`${r.c} font-medium flex-1`}>{r.vm}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card title="ViewModel vs SavedStateHandle" color="purple">
          <Table headers={["","ViewModel","ViewModel + SavedStateHandle"]} rows={[
            ["Survives rotation","✅ Yes","✅ Yes"],
            ["Survives process death","❌ No","✅ Yes"],
            ["How data is saved","In memory","via onSaveInstanceState under the hood"],
            ["Data size limit","Large (in memory)","Small — for critical UI state only"],
            ["Use for","API results, lists, state","Selected item ID, scroll position, user input"],
          ]} />
          <Callout type="tip">Rule of thumb: store large data in ViewModel, store small critical UI state (what the user typed, what was selected) in SavedStateHandle.</Callout>
        </Card>
      </div>
    )
  },
  {
    id:"livedata", label:"📡 LiveData",
    content: () => (
      <div>
        <p className="text-gray-400 text-xs mb-4">LiveData is the observation layer between ViewModel and your UI. It's lifecycle-aware, meaning it only delivers updates when the UI is actually visible — no crashes, no leaks.</p>
        <Card title="LiveData vs MutableLiveData" color="indigo">
          <div className="grid grid-cols-2 gap-3 text-xs mb-3">
            <div className="bg-indigo-900/40 rounded-lg p-3 border border-indigo-500/30">
              <div className="text-indigo-300 font-bold mb-1">LiveData (read-only)</div>
              <div className="text-gray-300">Exposed to the UI. UI can only observe — it cannot change the value.</div>
              <CodeBlock code={`val items: LiveData<List<Item>>\n  get() = _items`} />
            </div>
            <div className="bg-blue-900/40 rounded-lg p-3 border border-blue-500/30">
              <div className="text-blue-300 font-bold mb-1">MutableLiveData (read-write)</div>
              <div className="text-gray-300">Private to ViewModel. ViewModel changes data here.</div>
              <CodeBlock code={`private val _items =\n  MutableLiveData<List<Item>>()\n// setValue() or postValue()`} />
            </div>
          </div>
          <Callout type="good">This pattern — private MutableLiveData, public LiveData — is the standard encapsulation pattern in every Android ViewModel.</Callout>
          <ConnectsTo items={["StateFlow is the modern coroutine-based alternative → Part 5/6","MediatorLiveData combines multiple sources"]} />
        </Card>
        <Card title="LiveData Variants" color="blue">
          <Table headers={["Type","Purpose","Use when"]} rows={[
            ["LiveData","Base observable, read-only","Exposing data from ViewModel to UI"],
            ["MutableLiveData","Settable LiveData","Internal ViewModel data management"],
            ["MediatorLiveData","Observes multiple LiveData sources","Combining or switching data streams"],
            ["Transformations.map","Transform value before UI receives it","Format, filter, convert data"],
            ["Transformations.switchMap","Switch source based on another LiveData","Search as user types — change source LiveData"],
            ["SingleLiveEvent","One-shot events — fire once only","Navigation, Toast, Snackbar triggers"],
          ]} />
          <Callout type="warn">LiveData re-emits the last value to new observers (e.g., after rotation). For navigation/toasts that should only fire once, use SingleLiveEvent or a Channel (Coroutines).</Callout>
        </Card>
        <Card title="How LiveData Prevents Crashes" color="green">
          <p className="text-xs text-gray-400 mb-2">Without lifecycle awareness, a background operation finishing after the Activity was destroyed would crash trying to update a null view.</p>
          <div className="space-y-1.5 text-xs">
            {[
              { state:"STARTED / RESUMED", receives:"✅ Updates delivered", color:"text-green-400" },
              { state:"PAUSED", receives:"✅ Updates delivered (still visible)", color:"text-green-400" },
              { state:"STOPPED", receives:"⏸ Updates paused, queued", color:"text-yellow-400" },
              { state:"DESTROYED", receives:"🗑 Observer auto-removed, no crash", color:"text-red-400" },
            ].map((r,i)=>(
              <div key={i} className="flex gap-3 bg-gray-800/40 rounded px-2 py-1.5">
                <span className="text-gray-300 w-32 shrink-0 font-mono">{r.state}</span>
                <span className={r.color}>{r.receives}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    )
  },
  {
    id:"room", label:"🗃️ Room",
    content: () => (
      <div>
        <p className="text-gray-400 text-xs mb-4">Room is Android's ORM (Object Relational Mapper) over SQLite. It gives you compile-time SQL checks, LiveData/Flow integration, and dramatically less boilerplate than raw SQLite.</p>
        <Card title="Room vs Raw SQLite" color="indigo">
          <Table headers={["","Raw SQLite","Room"]} rows={[
            ["SQL errors caught","❌ At runtime (crash)","✅ At compile time"],
            ["Boilerplate","High — cursors, ContentValues","Low — annotations"],
            ["Works with LiveData?","❌ Manual","✅ Built-in"],
            ["Migration support","Manual, error-prone","Structured Migration API"],
            ["Testability","Hard","Easy — in-memory DB for tests"],
          ]} />
        </Card>
        <Card title="Room's 3 Layers" color="blue">
          <div className="space-y-2 text-xs">
            {[
              { name:"@Entity", color:"bg-indigo-800/60", desc:"A Kotlin data class annotated to become a DB table. Each field = a column.", code:"@Entity(tableName = \"users\")\ndata class User(@PrimaryKey val id: Int, val name: String)" },
              { name:"@Dao (Data Access Object)", color:"bg-blue-800/60", desc:"An interface with annotated methods. Room generates the SQL implementation.", code:"@Dao interface UserDao {\n  @Query(\"SELECT * FROM users\")\n  fun getAll(): LiveData<List<User>>\n  @Insert fun insert(user: User)\n}" },
              { name:"@Database", color:"bg-teal-800/60", desc:"The database itself. Ties Entities and DAOs together. Should be a singleton.", code:"@Database(entities=[User::class], version=1)\nabstract class AppDatabase : RoomDatabase() {\n  abstract fun userDao(): UserDao\n}" },
            ].map((l,i)=>(
              <div key={i} className={`${l.color} rounded-lg p-3`}>
                <div className="text-white font-bold font-mono">{l.name}</div>
                <div className="text-gray-300 mt-1">{l.desc}</div>
                <CodeBlock code={l.code} />
              </div>
            ))}
          </div>
          <ConnectsTo items={["Repository uses DAOs → Part 2: Arch Components","Room + LiveData = reactive DB queries","Migrations needed when schema changes"]} />
        </Card>
        <Card title="Room Relationships" color="purple">
          <Table headers={["Relationship","How to implement","Example"]} rows={[
            ["One-to-One","@Embedded or @Relation","User ↔ UserProfile"],
            ["One-to-Many","@Relation with List","User → many Orders"],
            ["Many-to-Many","Junction/cross-reference table","Students ↔ Courses"],
          ]} />
        </Card>
        <Card title="Database Migrations" color="orange">
          <p className="text-xs text-gray-400 mb-2">Every time you change the schema (add a column, rename a table), increment the version number and provide a Migration object. Without it, Room will crash or wipe data.</p>
          <CodeBlock code={`val MIGRATION_1_2 = object : Migration(1, 2) {\n  override fun migrate(db: SupportSQLiteDatabase) {\n    db.execSQL("ALTER TABLE users ADD COLUMN age INTEGER")\n  }\n}`} />
          <Callout type="danger">Never change schema without a Migration in production. Room will throw at runtime if versions don't match.</Callout>
        </Card>
      </div>
    )
  },
  {
    id:"navigation", label:"🗺️ Navigation",
    content: () => (
      <div>
        <p className="text-gray-400 text-xs mb-4">The Navigation Component is Google's solution to the historically painful mess of managing Fragment transactions, back stacks, and argument passing manually.</p>
        <Card title="Before vs After Navigation Component" color="indigo">
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-red-900/40 rounded-lg p-3 border border-red-500/30">
              <div className="text-red-300 font-bold mb-2">❌ Manual FragmentManager</div>
              <div className="text-gray-300 space-y-1">
                <div>• Manual FragmentManager transactions</div>
                <div>• No visual overview of app flow</div>
                <div>• Back stack management = bugs</div>
                <div>• Arguments passed as untyped Bundle extras</div>
                <div>• Runtime crashes from type mismatches</div>
              </div>
            </div>
            <div className="bg-green-900/40 rounded-lg p-3 border border-green-500/30">
              <div className="text-green-300 font-bold mb-2">✅ Navigation Component</div>
              <div className="text-gray-300 space-y-1">
                <div>• Visual navigation graph in XML</div>
                <div>• NavController.navigate() — one line</div>
                <div>• Automatic back stack handling</div>
                <div>• Safe Args — type-safe argument passing</div>
                <div>• Deep link support built-in</div>
              </div>
            </div>
          </div>
          <ConnectsTo items={["Fragment add/replace → Part 1: Fragment","Safe Args replaces intent extras","Deep linking connects to Part 1: Intents"]} />
        </Card>
        <Card title="Core Concepts" color="blue">
          <div className="space-y-2 text-xs">
            {[
              { name:"Navigation Graph", desc:"An XML file defining all screens (destinations) and connections (actions) in your app. Visualized as a flowchart in Android Studio.", color:"text-blue-300" },
              { name:"NavController", desc:"The object that actually performs navigation. Get it via findNavController(). Call navigate(actionId) to move between destinations.", color:"text-indigo-300" },
              { name:"NavHostFragment", desc:"A container fragment in your Activity's layout that swaps out destinations as you navigate. Set app:defaultNavHost=\"true\" to handle back button.", color:"text-teal-300" },
              { name:"Destination", desc:"Any screen the user can navigate to — a Fragment, Activity, or dialog.", color:"text-green-300" },
              { name:"Action", desc:"A connection between two destinations in the graph. Can carry arguments and define animations.", color:"text-purple-300" },
            ].map((item,i)=>(
              <div key={i} className="bg-gray-800/50 rounded-lg p-2.5 border border-gray-700/30">
                <span className={`${item.color} font-bold`}>{item.name}</span>
                <span className="text-gray-400 ml-2">{item.desc}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card title="Safe Args vs Implicit Intents" color="green">
          <Table headers={["","Safe Args","Implicit Intent"]} rows={[
            ["Type safety","✅ Compile-time checked","❌ Runtime crash risk"],
            ["Scope","Within Navigation graph","Cross-app, system-wide"],
            ["Auto-generated classes","✅ Yes — directions + args","❌ Manual Bundle keys"],
            ["Deep link support","✅ Built-in","✅ Built-in (but separate)"],
            ["Best for","In-app navigation","Opening other apps, sharing"],
          ]} />
        </Card>
        <Card title="Back Stack Control" color="purple">
          <p className="text-xs text-gray-400 mb-2">Use <span className="text-purple-300 font-mono">popUpTo</span> and <span className="text-purple-300 font-mono">popUpToInclusive</span> in your nav graph actions to control back stack depth.</p>
          <CodeBlock code={`<action\n  android:id="@+id/to_home"\n  app:destination="@id/homeFragment"\n  app:popUpTo="@id/homeFragment"\n  app:popUpToInclusive="true" />`} />
          <Callout type="tip">popUpToInclusive="true" removes the destination itself from the stack too — useful for login → main flow where you don't want back going to login.</Callout>
        </Card>
      </div>
    )
  },
  {
    id:"workmanager", label:"⚙️ WorkManager",
    content: () => (
      <div>
        <p className="text-gray-400 text-xs mb-4">WorkManager is the modern, guaranteed background work solution. It replaced IntentService, JobScheduler, and AlarmManager for most use cases. This builds directly on the Services section in Part 1.</p>
        <Card title="WorkManager vs Alternatives" color="indigo">
          <Table headers={["","WorkManager","JobScheduler","AlarmManager"]} rows={[
            ["Guaranteed execution","✅ Even after restart","✅ Best-effort","✅ Exact timing"],
            ["Constraint support","✅ Network, battery, storage","✅ Yes","❌ No"],
            ["Chaining tasks","✅ Yes","❌ No","❌ No"],
            ["API compatibility","All API levels","21+","All"],
            ["Exact timing","❌ Approximate","❌ Approximate","✅ Yes"],
            ["Best for","Deferrable guaranteed work","Constraint-based jobs","Exact-time triggers"],
          ]} />
          <ConnectsTo items={["JobScheduler → Part 1: Services","Background Services replaced by WorkManager","Coroutines integrate with CoroutineWorker → Part 5"]} />
        </Card>
        <Card title="3 Types of Work Requests" color="green">
          <div className="space-y-2 text-xs">
            {[
              { name:"OneTimeWorkRequest", color:"bg-blue-800/60", desc:"Executes once. Most common. Use for uploads, one-off sync.", code:"val req = OneTimeWorkRequestBuilder<MyWorker>()\n  .setConstraints(constraints).build()\nWorkManager.getInstance(ctx).enqueue(req)" },
              { name:"PeriodicWorkRequest", color:"bg-purple-800/60", desc:"Repeating task. Minimum interval: 15 minutes. Use for daily backups, periodic sync.", code:"val req = PeriodicWorkRequestBuilder<MyWorker>(\n  15, TimeUnit.MINUTES).build()" },
              { name:"UniqueWorkRequest", color:"bg-teal-800/60", desc:"Ensures only one instance of a named task runs. REPLACE, KEEP, or APPEND existing.", code:"WorkManager.getInstance(ctx)\n  .enqueueUniqueWork(\"sync\",\n    ExistingWorkPolicy.KEEP, req)" },
            ].map((w,i)=>(
              <div key={i} className={`${w.color} rounded-lg p-3`}>
                <div className="text-white font-bold">{w.name}</div>
                <div className="text-gray-300 mt-1">{w.desc}</div>
                <CodeBlock code={w.code} />
              </div>
            ))}
          </div>
        </Card>
        <Card title="Chaining Work" color="blue">
          <p className="text-xs text-gray-400 mb-2">WorkManager supports sequential and parallel chaining. If any work fails, downstream work is cancelled (unless you handle the failure).</p>
          <CodeBlock code={`WorkManager.getInstance(context)\n  .beginWith(downloadWork)   // Step 1\n  .then(processWork)          // Step 2 (after download)\n  .then(uploadWork)           // Step 3 (after process)\n  .enqueue()`} />
          <Callout type="tip">Chain + constraints = powerful pipeline. e.g., download on WiFi → process on any network → upload only when charging.</Callout>
        </Card>
        <Card title="WorkManager Limitations" color="yellow">
          <div className="space-y-1.5 text-xs">
            {[
              "⏱ Minimum 15-minute interval for periodic work",
              "⚡ Exact timing not guaranteed — system may defer for battery/conditions",
              "📦 Not for immediate foreground work — use Coroutines or Services instead",
              "🔋 Constraints may delay work significantly on battery-saver devices",
            ].map((l,i)=><div key={i} className="bg-gray-800/50 rounded px-3 py-1.5 text-gray-300">{l}</div>)}
          </div>
        </Card>
      </div>
    )
  },
  {
    id:"paging-di", label:"📄 Paging & DI",
    content: () => (
      <div>
        <p className="text-gray-400 text-xs mb-4">Paging handles large datasets without loading everything into memory. DI (Dependency Injection) is the architectural glue that wires all components together cleanly.</p>
        <Card title="Paging Library — The 3 Layers" color="indigo">
          <div className="space-y-2 text-xs mb-3">
            {[
              { name:"PagingSource", color:"bg-indigo-800/60", desc:"Defines how to load one page of data. Override load() to fetch from DB or network.", role:"Data Layer" },
              { name:"PagingData", color:"bg-blue-800/60", desc:"A stream of paginated data. Observed by the UI. Automatically handles diffing.", role:"ViewModel Layer" },
              { name:"PagingDataAdapter", color:"bg-teal-800/60", desc:"RecyclerView adapter that accepts PagingData. Handles item diffing automatically.", role:"UI Layer" },
            ].map((p,i)=>(
              <div key={i} className={`${p.color} rounded-lg p-2.5 flex gap-3 items-start`}>
                <div className="flex-1">
                  <div className="flex items-center gap-2"><span className="text-white font-bold">{p.name}</span><Badge text={p.role} color="gray" /></div>
                  <div className="text-gray-300 mt-1">{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <Card title="Loading States" color="blue">
            <Table headers={["State","Meaning","UI Action"]} rows={[
              ["LoadState.Loading","Data is being fetched","Show spinner"],
              ["LoadState.NotLoading","Data ready or idle","Show content"],
              ["LoadState.Error","Fetch failed","Show error + retry button"],
            ]} />
          </Card>
          <Callout type="tip">RemoteMediator bridges network + local DB — fetch from API, cache in Room, serve from Room. This gives you offline support for free.</Callout>
          <ConnectsTo items={["PagingSource connects to Room or Retrofit","RemoteMediator = Network + Room → Part 2: Room","RecyclerView for efficient list rendering"]} />
        </Card>
        <Card title="Dependency Injection (DI)" color="purple">
          <p className="text-xs text-gray-400 mb-2">DI means: don't let a class create its own dependencies — receive them from outside. This makes testing easy (inject mocks) and decouples your code.</p>
          <div className="grid grid-cols-2 gap-3 text-xs mb-3">
            <div className="bg-red-900/40 rounded-lg p-3 border border-red-500/30">
              <div className="text-red-300 font-bold mb-1">❌ Without DI</div>
              <CodeBlock code={`class UserRepo {\n  // Creates its own dep\n  val db = AppDatabase.getInstance()\n  // Hard to test, tightly coupled\n}`} />
            </div>
            <div className="bg-green-900/40 rounded-lg p-3 border border-green-500/30">
              <div className="text-green-300 font-bold mb-1">✅ With DI (Hilt)</div>
              <CodeBlock code={`class UserRepo @Inject constructor(\n  val db: AppDatabase\n  // DB is injected — easy to mock!\n)`} />
            </div>
          </div>
          <Table headers={["Framework","Style","When to use"]} rows={[
            ["Hilt","Annotation-based, opinionated","New Android projects — Google recommended"],
            ["Dagger 2","Annotation-based, manual","Large enterprise projects, full control"],
            ["Koin","DSL-based, lightweight","Smaller projects, Kotlin-first"],
            ["Manual DI","Pass via constructor","Very small apps or learning"],
          ]} />
          <ConnectsTo items={["DI → Testability → Part 2: Testing","Hilt integrates with ViewModel, WorkManager, Room"]} />
        </Card>
        <Card title="DataStore vs SharedPreferences" color="teal">
          <Table headers={["","SharedPreferences","DataStore"]} rows={[
            ["Thread safety","❌ Not safe","✅ Safe"],
            ["Async support","❌ Blocks main thread","✅ Coroutines/Flow"],
            ["Type safety","❌ No (just keys/values)","✅ Yes (Proto DataStore)"],
            ["Migration support","❌ Manual","✅ Built-in"],
            ["Modern recommendation","❌ Avoid in new code","✅ Use this"],
          ]} />
          <Callout type="warn">SharedPreferences can throw exceptions on the main thread. DataStore is always async and safe. Prefer DataStore for all new code.</Callout>
        </Card>
      </div>
    )
  },
  {
    id:"build", label:"🔨 Build Process",
    content: () => (
      <div>
        <p className="text-gray-400 text-xs mb-4">Understanding the build process helps you optimize build times, manage dependencies correctly, and configure release builds. This comes up frequently in senior interviews.</p>
        <Card title="Build Pipeline — Code to APK" color="indigo">
          <LifecycleFlow steps={[
            { name:"Source Code (Kotlin/Java)", note:"Your .kt and .java files" },
            { name:"Compile", note:"Kotlin/Java compiler → bytecode (.class files)" },
            { name:"Resource Processing (AAPT)", note:"XML layouts, drawables → binary. Generates R.java with resource IDs." },
            { name:"D8 / R8", note:"Bytecode → DEX format. R8 also shrinks and obfuscates (release builds)." },
            { name:"Linking", note:"DEX + compiled resources + Manifest merged together." },
            { name:"APK / AAB Packaged", note:"Signed and ready for install or Play Store upload." },
          ]} colors={["bg-gray-700","bg-indigo-700","bg-blue-700","bg-purple-700","bg-teal-700","bg-green-700"]} />
        </Card>
        <Card title="APK vs AAB" color="blue">
          <Table headers={["","APK","AAB (Android App Bundle)"]} rows={[
            ["Contains","Everything for all devices","All resources, Play optimizes delivery"],
            ["Download size","Larger (includes all densities)","Smaller (device-specific split)"],
            ["Sideloading","✅ Yes","❌ Only via Play Store"],
            ["Dynamic features","❌ No","✅ On-demand modules"],
            ["Google Play requirement","No (but APK accepted)","Preferred for new apps"],
          ]} />
        </Card>
        <Card title="Gradle Dependency Scopes" color="green">
          <Table headers={["Keyword","Exposed to other modules?","In final APK?","Use for"]} rows={[
            ["implementation","❌ No","✅ Yes","Internal dependencies (default choice)"],
            ["api","✅ Yes (transitive)","✅ Yes","Libraries you expose as part of your API"],
            ["compileOnly","❌ No","❌ No","Annotation processors, provided libs"],
            ["testImplementation","❌ No","❌ No (test only)","Unit test dependencies"],
            ["debugImplementation","❌ No","Debug builds only","LeakCanary, debug tools"],
          ]} />
          <Callout type="tip">Prefer implementation over api — it hides your dependencies from consumers, improving encapsulation and build speed.</Callout>
        </Card>
        <Card title="ProGuard vs R8" color="purple">
          <Table headers={["","ProGuard","R8"]} rows={[
            ["What it does","Shrink + obfuscate bytecode","Shrink + obfuscate + optimize DEX"],
            ["Speed","Slower (separate passes)","Faster (single pass)"],
            ["Default in Android?","Legacy","✅ Default since AGP 3.4"],
            ["Result","Smaller APK","Even smaller APK + better performance"],
          ]} />
          <Callout type="warn">Always keep the mapping.txt file from release builds. Without it, you can't deobfuscate crash stack traces in production.</Callout>
        </Card>
        <Card title="Build Types & Flavors" color="orange">
          <div className="text-xs text-gray-300 mb-2">Build Type × Product Flavor = Build Variant</div>
          <div className="grid grid-cols-2 gap-3 text-xs mb-3">
            <div className="bg-gray-800/50 rounded p-2 border border-gray-700/30">
              <div className="text-orange-300 font-bold">Build Types</div>
              <div className="text-gray-400 mt-1">debug — dev tools, logging, no shrinking</div>
              <div className="text-gray-400">release — obfuscated, signed, optimized</div>
            </div>
            <div className="bg-gray-800/50 rounded p-2 border border-gray-700/30">
              <div className="text-yellow-300 font-bold">Product Flavors</div>
              <div className="text-gray-400 mt-1">free — limited features</div>
              <div className="text-gray-400">paid — full features</div>
            </div>
          </div>
          <div className="text-xs text-gray-400">Result: <Badge text="freeDebug" color="gray" /> <Badge text="freeRelease" color="gray" /> <Badge text="paidDebug" color="gray" /> <Badge text="paidRelease" color="green" /></div>
        </Card>
        <Card title="Build Speed Tips" color="teal">
          <div className="grid grid-cols-2 gap-2 text-xs">
            {[
              { tip:"Enable Gradle Daemon", code:"org.gradle.daemon=true" },
              { tip:"Parallel builds", code:"org.gradle.parallel=true" },
              { tip:"Build cache", code:"org.gradle.caching=true" },
              { tip:"Incremental compile", code:"kotlin.incremental=true" },
            ].map((t,i)=>(
              <div key={i} className="bg-gray-800/50 rounded p-2 border border-gray-700/30">
                <div className="text-teal-300 font-semibold">{t.tip}</div>
                <div className="font-mono text-green-400 mt-1 text-xs">{t.code}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    )
  },
  {
    id:"testing", label:"🧪 Testing",
    content: () => (
      <div>
        <p className="text-gray-400 text-xs mb-4">Testing in Android spans three layers — unit, integration, and E2E. Each has different tools and tradeoffs. Good DI (previous section) is what makes all of this possible.</p>
        <Card title="The Testing Pyramid" color="indigo">
          <div className="space-y-1.5 text-xs">
            {[
              { type:"End-to-End Tests (E2E)", tool:"Espresso, UI Automator", count:"Few", speed:"Slow", cost:"High", color:"bg-red-800/60", note:"Test full user flows on real device/emulator" },
              { type:"Integration Tests", tool:"Robolectric, AndroidJUnit", count:"Some", speed:"Medium", cost:"Medium", color:"bg-yellow-800/60", note:"Test how layers work together (ViewModel + Repository)" },
              { type:"Unit Tests", tool:"JUnit4, Mockito", count:"Many", speed:"Fast ⚡", cost:"Low", color:"bg-green-800/60", note:"Test single functions/classes in isolation on JVM" },
            ].map((t,i)=>(
              <div key={i} className={`${t.color} rounded-lg p-3`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white font-bold">{t.type}</span>
                  <div className="flex gap-1"><Badge text={t.speed} color="gray" /><Badge text={t.count} color="gray" /></div>
                </div>
                <div className="text-gray-300">{t.tool} — {t.note}</div>
              </div>
            ))}
          </div>
          <Callout type="tip">Aim for many unit tests, some integration tests, and few E2E tests. Each layer is progressively slower and more expensive to maintain.</Callout>
          <ConnectsTo items={["DI makes mocking possible → previous section","ViewModel unit testing uses JUnit + Mockito","Room in-memory DB for integration tests"]} />
        </Card>
        <Card title="Core Testing Tools" color="blue">
          <Table headers={["Tool","Type","Purpose"]} rows={[
            ["JUnit4","Unit","Test framework. @Test, @Before, @After, assertions."],
            ["Mockito","Unit","Create mocks/spies. Verify method calls, stub returns."],
            ["Robolectric","Integration","Run Android tests on JVM without emulator. Fast."],
            ["Espresso","UI/E2E","Write UI interaction tests. onView(), perform(), check()."],
            ["MockWebServer","Integration","Fake HTTP server for testing network layer."],
            ["Truth","Unit","Google's fluent assertion library. Readable assertions."],
          ]} />
        </Card>
        <Card title="Mockito: @Mock vs @Spy" color="green">
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-indigo-900/40 rounded-lg p-3 border border-indigo-500/30">
              <div className="text-indigo-300 font-bold mb-1">@Mock</div>
              <div className="text-gray-300">Completely fake object. All methods return defaults (null/0/false). You define behavior with <span className="font-mono">when().thenReturn()</span>.</div>
              <div className="text-gray-400 mt-1">Use when: replacing a complex dependency entirely.</div>
            </div>
            <div className="bg-blue-900/40 rounded-lg p-3 border border-blue-500/30">
              <div className="text-blue-300 font-bold mb-1">@Spy</div>
              <div className="text-gray-300">Wraps a real object. Real methods run by default. You can override specific methods and verify interactions.</div>
              <div className="text-gray-400 mt-1">Use when: testing a class but spying on specific methods.</div>
            </div>
          </div>
          <CodeBlock code={`// Mock — full fake\n@Mock lateinit var repo: UserRepository\nwhenever(repo.getUser(1)).thenReturn(fakeUser)\n\n// Spy — real object, partial override\n@Spy val calc = Calculator()\ndoReturn(42).whenever(calc).heavyOp()`} />
        </Card>
        <Card title="Mockito: when() and verify()" color="purple">
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-gray-800/50 rounded p-3 border border-gray-700/30">
              <div className="text-purple-300 font-bold mb-1">when() — stub behavior</div>
              <div className="text-gray-400">Define what a mock returns when called.</div>
              <CodeBlock code={`whenever(repo.getUser(1))\n  .thenReturn(User("Alice"))`} />
            </div>
            <div className="bg-gray-800/50 rounded p-3 border border-gray-700/30">
              <div className="text-blue-300 font-bold mb-1">verify() — check interactions</div>
              <div className="text-gray-400">Assert that a method was (or wasn't) called.</div>
              <CodeBlock code={`verify(repo, times(1)).saveUser(any())\nverify(repo, never()).deleteUser(any())`} />
            </div>
          </div>
        </Card>
        <Card title="Unit Test Naming Convention" color="teal">
          <p className="text-xs text-gray-400 mb-2">Good test names communicate intent instantly — no need to read the test body to know what it tests.</p>
          <div className="bg-gray-900/60 rounded p-3 text-xs font-mono">
            <div className="text-yellow-300">// Format: methodName_StateUnderTest_ExpectedBehavior</div>
            <div className="text-green-300 mt-1">@Test</div>
            <div className="text-green-300">fun getUser_whenUserExists_returnsUser()</div>
            <div className="text-green-300 mt-2">@Test</div>
            <div className="text-green-300">fun getUser_whenUserNotFound_throwsException()</div>
          </div>
        </Card>
        <Card title="Common Unit Testing Anti-Patterns" color="red">
          <div className="space-y-1.5 text-xs">
            {[
              { bad:"Testing implementation details", fix:"Test behavior and outcomes, not internal method calls" },
              { bad:"Over-mocking everything", fix:"Use real objects for simple dependencies" },
              { bad:"Multiple assertions per test", fix:"One logical assertion per test = clear failure reason" },
              { bad:"Ignoring failing tests", fix:"A failing test is a bug — fix or delete it" },
              { bad:"Tests that depend on each other", fix:"Each test must be independent and self-contained" },
            ].map((p,i)=>(
              <div key={i} className="bg-gray-800/50 rounded px-3 py-2 border border-gray-700/30">
                <span className="text-red-300">❌ {p.bad}</span>
                <span className="text-green-300 ml-2">→ {p.fix}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    )
  },
  {
    id:"debugging", label:"🐛 Debugging",
    content: () => (
      <div>
        <p className="text-gray-400 text-xs mb-4">Debugging tools are how you find problems that tests don't catch. Every senior Android dev needs fluency with the Android Profiler, ADB, and memory analysis.</p>
        <Card title="Android Profiler — 4 Components" color="indigo">
          <div className="space-y-2 text-xs">
            {[
              { name:"CPU Profiler", icon:"⚡", color:"bg-indigo-800/60", desc:"Tracks CPU usage over time. Identify which methods consume the most CPU. Use Sampling (low overhead) or Instrumentation (detailed traces).", when:"App feels slow / janky / ANRs" },
              { name:"Memory Profiler", icon:"🧠", color:"bg-blue-800/60", desc:"Tracks memory allocation. Take heap dumps to analyze retained objects. Find what's not being garbage collected.", when:"App memory grows over time" },
              { name:"Network Profiler", icon:"📡", color:"bg-teal-800/60", desc:"Shows all network requests — timing, payload size, response codes. Identify slow/large requests and HTTP errors.", when:"App is slow loading data" },
              { name:"Energy Profiler", icon:"🔋", color:"bg-green-800/60", desc:"Shows battery usage patterns. Identify wake locks, background work, and GPS usage draining battery.", when:"App drains battery quickly" },
            ].map((p,i)=>(
              <div key={i} className={`${p.color} rounded-lg p-3`}>
                <div className="flex items-center gap-2 mb-1"><span>{p.icon}</span><span className="text-white font-bold">{p.name}</span><Badge text={`Use when: ${p.when}`} color="gray" /></div>
                <div className="text-gray-300">{p.desc}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card title="Memory Leak Detection Flow" color="red">
          <LifecycleFlow steps={[
            { name:"Suspect a leak", note:"Memory grows over time, app gets slow/crashes" },
            { name:"Enable LeakCanary", note:"Add dependency — it auto-monitors your app" },
            { name:"Reproduce the leak", note:"Navigate around, rotate screens, go back" },
            { name:"LeakCanary notification", note:"Tells you exactly what's leaking and the reference chain" },
            { name:"Memory Profiler heap dump", note:"For deeper analysis — see retained objects manually" },
            { name:"Fix: remove reference", note:"Null out in onDestroyView(), use WeakReference, fix lifecycle issue" },
          ]} colors={["bg-gray-700","bg-indigo-700","bg-blue-700","bg-yellow-700","bg-orange-700","bg-green-700"]} />
          <Callout type="tip">LeakCanary is the #1 tool for finding Activity/Fragment leaks. Add it to your debugImplementation dependencies — it costs nothing in release builds.</Callout>
          <ConnectsTo items={["Context misuse → Part 1: Architecture","onDestroyView() null binding → Part 1: Fragment","ViewModel avoids most leaks → Part 2: ViewModel"]} />
        </Card>
        <Card title="ANR Prevention Strategy" color="orange">
          <p className="text-xs text-gray-400 mb-2">ANR = main thread blocked for 5+ seconds. The fix is always the same: move work off the main thread.</p>
          <Table headers={["Bad practice","Fix"]} rows={[
            ["Network call on main thread","Use Coroutines with Dispatchers.IO"],
            ["DB query on main thread","Use Room with suspend functions / LiveData"],
            ["File I/O in onCreate()","Move to background thread"],
            ["Heavy computation in onDraw()","Pre-compute, cache result"],
            ["Blocking sleep/wait on main thread","Use coroutine delay() instead"],
          ]} />
        </Card>
        <Card title="ADB — Essential Commands" color="teal">
          <div className="grid grid-cols-2 gap-2 text-xs">
            {[
              { cmd:"adb logcat", desc:"Stream device logs to terminal" },
              { cmd:"adb shell dumpsys meminfo <pkg>", desc:"Memory breakdown for your app" },
              { cmd:"adb install app.apk", desc:"Install APK directly to device" },
              { cmd:"adb shell am start -n pkg/.Activity", desc:"Launch specific Activity" },
              { cmd:"adb bugreport", desc:"Full device diagnostic report" },
              { cmd:"adb shell input keyevent 82", desc:"Simulate menu button press" },
            ].map((c,i)=>(
              <div key={i} className="bg-gray-800/50 rounded p-2 border border-gray-700/30">
                <div className="text-green-300 font-mono">{c.cmd}</div>
                <div className="text-gray-400 mt-0.5">{c.desc}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card title="StrictMode — Catch Issues Early" color="purple">
          <p className="text-xs text-gray-400 mb-2">StrictMode throws visible penalties (log, dialog, crash) when you violate best practices during development. Enable it in debug builds only.</p>
          <CodeBlock code={`if (BuildConfig.DEBUG) {\n  StrictMode.setThreadPolicy(\n    StrictMode.ThreadPolicy.Builder()\n      .detectAll()   // disk, network on main thread\n      .penaltyLog()\n      .build()\n  )\n}`} />
          <Callout type="good">Run StrictMode during development and fix every violation. It catches subtle main-thread abuse before users ever see it.</Callout>
        </Card>
      </div>
    )
  }
];

// ─── PART DEFINITIONS ────────────────────────────────────────────────────────

const PARTS = [
  { id:"p1", label:"Part 1", title:"Android Basics", color:"indigo", emoji:"📘", sections: part1Sections },
  { id:"p2", label:"Part 2", title:"Android Experts", color:"purple", emoji:"📗", sections: part2Sections },
];

// ─── MAIN APP ────────────────────────────────────────────────────────────────

export default function App() {
  const [activePart, setActivePart] = useState("p1");
  const [activeSection, setActiveSection] = useState("architecture");
  const [completed, setCompleted] = useState({});

  const currentPart = PARTS.find(p => p.id === activePart);
  const currentSection = currentPart?.sections.find(s => s.id === activeSection);
  const sectionKey = `${activePart}-${activeSection}`;
  const isDone = !!completed[sectionKey];

  const totalSections = PARTS.reduce((a,p) => a + p.sections.length, 0);
  const completedCount = Object.values(completed).filter(Boolean).length;
  const progressPct = Math.round((completedCount / totalSections) * 100);

  const toggleDone = () => setCompleted(prev => ({ ...prev, [sectionKey]: !prev[sectionKey] }));

  const goNext = () => {
    const secs = currentPart.sections;
    const idx = secs.findIndex(s => s.id === activeSection);
    if (idx < secs.length - 1) { setActiveSection(secs[idx+1].id); }
    else {
      const pIdx = PARTS.findIndex(p => p.id === activePart);
      if (pIdx < PARTS.length - 1) { const np = PARTS[pIdx+1]; setActivePart(np.id); setActiveSection(np.sections[0].id); }
    }
  };

  const goPrev = () => {
    const secs = currentPart.sections;
    const idx = secs.findIndex(s => s.id === activeSection);
    if (idx > 0) { setActiveSection(secs[idx-1].id); }
    else {
      const pIdx = PARTS.findIndex(p => p.id === activePart);
      if (pIdx > 0) { const pp = PARTS[pIdx-1]; setActivePart(pp.id); setActiveSection(pp.sections[pp.sections.length-1].id); }
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-3xl mx-auto px-4 py-6">

        {/* Header */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-1">
            <h1 className="text-xl font-bold text-white">Android Dev — Study Guide</h1>
            <span className="text-xs text-gray-400">{completedCount}/{totalSections} sections · {progressPct}%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-1.5">
            <div className="bg-indigo-500 h-1.5 rounded-full transition-all duration-500" style={{ width:`${progressPct}%` }} />
          </div>
        </div>

        {/* Part Tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
          {PARTS.map(p => {
            const pDone = p.sections.filter(s => completed[`${p.id}-${s.id}`]).length;
            return (
              <button key={p.id} onClick={() => { setActivePart(p.id); setActiveSection(p.sections[0].id); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${activePart===p.id?"bg-indigo-600 text-white shadow-lg shadow-indigo-900/40":"bg-gray-800 text-gray-400 hover:bg-gray-700"}`}>
                <span>{p.emoji}</span>{p.label}: {p.title}
                <span className="opacity-60 text-xs">({pDone}/{p.sections.length})</span>
              </button>
            );
          })}
          <div className="px-3 py-1.5 rounded-lg text-xs text-gray-600 bg-gray-800/40 border border-gray-700/30 border-dashed whitespace-nowrap">+ More coming</div>
        </div>

        {/* Section Tabs */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {currentPart?.sections.map(s => {
            const key = `${activePart}-${s.id}`;
            const done = !!completed[key];
            return (
              <button key={s.id} onClick={() => setActiveSection(s.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${activeSection===s.id?"bg-indigo-600 text-white":"bg-gray-800 text-gray-400 hover:bg-gray-700"} ${done?"opacity-60":""}`}>
                {done && <span className="text-green-400">✓</span>}
                {s.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="mb-4">{currentSection?.content()}</div>

        {/* Footer Nav */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-800">
          <button onClick={goPrev} className="text-xs text-gray-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-800">← Prev</button>
          <button onClick={toggleDone}
            className={`text-xs px-4 py-1.5 rounded-lg font-semibold transition-all ${isDone?"bg-green-700 text-green-100 hover:bg-green-800":"bg-gray-700 text-gray-300 hover:bg-gray-600"}`}>
            {isDone ? "✓ Marked Done" : "Mark as Done"}
          </button>
          <button onClick={goNext} className="text-xs text-gray-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-800">Next →</button>
        </div>

      </div>
    </div>
  );
}